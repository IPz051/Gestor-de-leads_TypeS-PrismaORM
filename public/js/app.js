
const API_URL = '/api';

// State
let currentView = 'dashboard';
let currentGroupId = null;
let currentCampaignId = null;

// DOM Elements
const views = {
    dashboard: document.getElementById('dashboard-view'),
    leads: document.getElementById('leads-view'),
    groups: document.getElementById('groups-view'),
    campaigns: document.getElementById('campaigns-view')
};

const tables = {
    leads: document.getElementById('leads-table-body'),
    groups: document.getElementById('groups-table-body'),
    campaigns: document.getElementById('campaigns-table-body'),
    groupLeads: document.getElementById('groupLeadsTableBody'),
    campaignLeads: document.getElementById('campaignLeadsTableBody')
};

const counts = {
    leads: document.getElementById('total-leads-count'),
    groups: document.getElementById('total-groups-count'),
    campaigns: document.getElementById('total-campaigns-count')
};

const CAMPAIGN_STATUSES = [
    "new", "engaged", "followUp_Scheduled", "followUp_Completed", 
    "contacted", "converted", "qualified", "unresponsive", 
    "disqualified", "re_engaged", "opted_out"
];

// Modals
const modals = {
    lead: new bootstrap.Modal(document.getElementById('leadModal')),
    group: new bootstrap.Modal(document.getElementById('groupModal')),
    campaign: new bootstrap.Modal(document.getElementById('campaignModal')),
    groupLeads: new bootstrap.Modal(document.getElementById('groupLeadsModal')),
    campaignLeads: new bootstrap.Modal(document.getElementById('campaignLeadsModal'))
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

// Navigation
function showView(viewName) {
    Object.values(views).forEach(el => el.classList.add('d-none'));
    views[viewName].classList.remove('d-none');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(viewName)) {
            link.classList.add('active');
        }
    });

    currentView = viewName;
    
    if (viewName === 'leads') loadLeads();
    if (viewName === 'groups') loadGroups();
    if (viewName === 'campaigns') loadCampaigns();
    if (viewName === 'dashboard') loadDashboard();
}

// Dashboard
async function loadDashboard() {
    try {
        const [leadsRes, groupsRes, campaignsRes] = await Promise.all([
            fetch(`${API_URL}/leads?pageSize=1`),
            fetch(`${API_URL}/groups`),
            fetch(`${API_URL}/campaigns`)
        ]);

        const leadsData = await leadsRes.json();
        const groupsData = await groupsRes.json();
        const campaignsData = await campaignsRes.json();

        counts.leads.textContent = leadsData.total || 0;
        counts.groups.textContent = groupsData.length || 0;
        counts.campaigns.textContent = campaignsData.length || 0;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Leads Logic
async function loadLeads() {
    try {
        const res = await fetch(`${API_URL}/leads`);
        const data = await res.json();
        const leads = data.leads || [];
        
        tables.leads.innerHTML = leads.map(lead => `
            <tr>
                <td>${lead.id}</td>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone || '-'}</td>
                <td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editLead(${lead.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteLead(${lead.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading leads:', error);
    }
}

function openLeadModal() {
    document.getElementById('leadForm').reset();
    document.getElementById('leadId').value = '';
    document.getElementById('leadModalTitle').textContent = 'Novo Lead';
    modals.lead.show();
}

async function editLead(id) {
    try {
        const res = await fetch(`${API_URL}/leads/${id}`);
        const lead = await res.json();
        
        document.getElementById('leadId').value = lead.id;
        document.getElementById('leadName').value = lead.name;
        document.getElementById('leadEmail').value = lead.email;
        document.getElementById('leadPhone').value = lead.phone || '';
        document.getElementById('leadStatus').value = lead.status;
        
        document.getElementById('leadModalTitle').textContent = 'Editar Lead';
        modals.lead.show();
    } catch (error) {
        console.error('Error fetching lead:', error);
    }
}

async function saveLead() {
    const id = document.getElementById('leadId').value;
    const data = {
        name: document.getElementById('leadName').value,
        email: document.getElementById('leadEmail').value,
        phone: document.getElementById('leadPhone').value,
        status: document.getElementById('leadStatus').value
    };

    if (!data.phone) delete data.phone;

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/leads/${id}` : `${API_URL}/leads`;
        
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            modals.lead.hide();
            loadLeads();
            loadDashboard();
        } else {
            const err = await res.json();
            alert('Erro ao salvar: ' + JSON.stringify(err));
        }
    } catch (error) {
        console.error('Error saving lead:', error);
    }
}

async function deleteLead(id) {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return;
    try {
        await fetch(`${API_URL}/leads/${id}`, { method: 'DELETE' });
        loadLeads();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting lead:', error);
    }
}

// Groups Logic
async function loadGroups() {
    try {
        const res = await fetch(`${API_URL}/groups`);
        const groups = await res.json();
        
        tables.groups.innerHTML = groups.map(group => `
            <tr>
                <td>${group.id}</td>
                <td>${group.name}</td>
                <td>${group.description || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-info me-1" onclick="openGroupLeadsModal(${group.id}, '${group.name}')">
                        <i class="fas fa-users"></i> Leads
                    </button>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editGroup(${group.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteGroup(${group.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading groups:', error);
    }
}

function openGroupModal() {
    document.getElementById('groupForm').reset();
    document.getElementById('groupId').value = '';
    document.getElementById('groupModalTitle').textContent = 'Novo Grupo';
    modals.group.show();
}

async function editGroup(id) {
    try {
        const res = await fetch(`${API_URL}/groups/${id}`);
        const group = await res.json();
        
        document.getElementById('groupId').value = group.id;
        document.getElementById('groupName').value = group.name;
        document.getElementById('groupDescription').value = group.description || '';
        
        document.getElementById('groupModalTitle').textContent = 'Editar Grupo';
        modals.group.show();
    } catch (error) {
        console.error('Error fetching group:', error);
    }
}

async function saveGroup() {
    const id = document.getElementById('groupId').value;
    const data = {
        name: document.getElementById('groupName').value,
        description: document.getElementById('groupDescription').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/groups/${id}` : `${API_URL}/groups`;
        
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            modals.group.hide();
            loadGroups();
            loadDashboard();
        } else {
            alert('Erro ao salvar grupo');
        }
    } catch (error) {
        console.error('Error saving group:', error);
    }
}

async function deleteGroup(id) {
    if (!confirm('Tem certeza que deseja excluir este grupo?')) return;
    try {
        await fetch(`${API_URL}/groups/${id}`, { method: 'DELETE' });
        loadGroups();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting group:', error);
    }
}

// Group Leads Logic
function openGroupLeadsModal(groupId, groupName) {
    currentGroupId = groupId;
    document.getElementById('groupLeadsTitle').textContent = `Leads do Grupo: ${groupName}`;
    document.getElementById('groupAddLeadId').value = '';
    loadGroupLeads(groupId);
    modals.groupLeads.show();
}

async function loadGroupLeads(groupId) {
    try {
        const res = await fetch(`${API_URL}/groups/${groupId}/leads`);
        const data = await res.json();
        const leads = data.leads || [];
        
        tables.groupLeads.innerHTML = leads.map(lead => `
            <tr>
                <td>${lead.id}</td>
                <td>${lead.name}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeLeadFromGroup(${lead.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading group leads:', error);
    }
}

async function addLeadToGroup() {
    const leadId = document.getElementById('groupAddLeadId').value;
    if (!leadId) return alert('Informe o ID do Lead');

    try {
        const res = await fetch(`${API_URL}/groups/${currentGroupId}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId: Number(leadId) })
        });

        if (res.ok) {
            document.getElementById('groupAddLeadId').value = '';
            loadGroupLeads(currentGroupId);
        } else {
            const err = await res.json();
            alert('Erro ao adicionar lead: ' + JSON.stringify(err));
        }
    } catch (error) {
        console.error('Error adding lead to group:', error);
    }
}

async function removeLeadFromGroup(leadId) {
    if (!confirm('Remover lead do grupo?')) return;
    try {
        await fetch(`${API_URL}/groups/${currentGroupId}/leads/${leadId}`, { method: 'DELETE' });
        loadGroupLeads(currentGroupId);
    } catch (error) {
        console.error('Error removing lead from group:', error);
    }
}

// Campaigns Logic
async function loadCampaigns() {
    try {
        const res = await fetch(`${API_URL}/campaigns`);
        const campaigns = await res.json();
        
        tables.campaigns.innerHTML = campaigns.map(campaign => `
            <tr>
                <td>${campaign.id}</td>
                <td>${campaign.name}</td>
                <td>${campaign.description || '-'}</td>
                <td>${formatDate(campaign.startDate)}</td>
                <td>${formatDate(campaign.endDate)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-info me-1" onclick="openCampaignLeadsModal(${campaign.id}, '${campaign.name}')">
                        <i class="fas fa-users"></i> Leads
                    </button>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editCampaign(${campaign.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCampaign(${campaign.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading campaigns:', error);
    }
}

function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
}

function openCampaignModal() {
    document.getElementById('campaignForm').reset();
    document.getElementById('campaignId').value = '';
    document.getElementById('campaignModalTitle').textContent = 'Nova Campanha';
    modals.campaign.show();
}

async function editCampaign(id) {
    try {
        const res = await fetch(`${API_URL}/campaigns/${id}`);
        const campaign = await res.json();
        
        document.getElementById('campaignId').value = campaign.id;
        document.getElementById('campaignName').value = campaign.name;
        document.getElementById('campaignDescription').value = campaign.description || '';
        document.getElementById('campaignStartDate').value = campaign.startDate ? campaign.startDate.split('T')[0] : '';
        document.getElementById('campaignEndDate').value = campaign.endDate ? campaign.endDate.split('T')[0] : '';
        
        document.getElementById('campaignModalTitle').textContent = 'Editar Campanha';
        modals.campaign.show();
    } catch (error) {
        console.error('Error fetching campaign:', error);
    }
}

async function saveCampaign() {
    const id = document.getElementById('campaignId').value;
    const data = {
        name: document.getElementById('campaignName').value,
        description: document.getElementById('campaignDescription').value,
        startDate: document.getElementById('campaignStartDate').value,
        endDate: document.getElementById('campaignEndDate').value
    };

    if (!data.startDate) return alert('Data de Início é obrigatória');
    if (!data.description) delete data.description;
    if (!data.endDate) delete data.endDate;

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/campaigns/${id}` : `${API_URL}/campaigns`;
        
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            modals.campaign.hide();
            loadCampaigns();
            loadDashboard();
        } else {
            const err = await res.json();
            alert('Erro ao salvar campanha: ' + JSON.stringify(err));
        }
    } catch (error) {
        console.error('Error saving campaign:', error);
    }
}

async function deleteCampaign(id) {
    if (!confirm('Tem certeza que deseja excluir esta campanha?')) return;
    try {
        await fetch(`${API_URL}/campaigns/${id}`, { method: 'DELETE' });
        loadCampaigns();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting campaign:', error);
    }
}

// Campaign Leads Logic
function openCampaignLeadsModal(campaignId, campaignName) {
    currentCampaignId = campaignId;
    document.getElementById('campaignLeadsTitle').textContent = `Leads da Campanha: ${campaignName}`;
    document.getElementById('campaignAddLeadId').value = '';
    loadCampaignLeads(campaignId);
    modals.campaignLeads.show();
}

async function loadCampaignLeads(campaignId) {
    try {
        const res = await fetch(`${API_URL}/campaigns/${campaignId}/leads`);
        const data = await res.json();
        const leads = data.leads || [];
        
        tables.campaignLeads.innerHTML = leads.map(item => {
            
            const currentStatus = item.campaigns?.[0]?.status || 'new';
            const groups = item.groups ? item.groups.map(g => `<span class="badge bg-secondary me-1">${g.name}</span>`).join('') : '-';
            
            const statusOptions = CAMPAIGN_STATUSES.map(s => 
                `<option value="${s}" ${s === currentStatus ? 'selected' : ''}>${s}</option>`
            ).join('');

            return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${groups}</td>
                <td>
                    <select class="form-select form-select-sm" onchange="updateLeadStatusInCampaign(${item.id}, this.value)">
                        ${statusOptions}
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeLeadFromCampaign(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `}).join('');
    } catch (error) {
        console.error('Error loading campaign leads:', error);
    }
}

async function updateLeadStatusInCampaign(leadId, newStatus) {
    try {
        const res = await fetch(`${API_URL}/campaigns/${currentCampaignId}/leads/${leadId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (!res.ok) {
            const err = await res.json();
            alert('Erro ao atualizar status: ' + JSON.stringify(err));
            loadCampaignLeads(currentCampaignId); // Reload to reset select if error
        }
    } catch (error) {
        console.error('Error updating lead status:', error);
        loadCampaignLeads(currentCampaignId);
    }
}

async function addLeadToCampaign() {
    const leadId = document.getElementById('campaignAddLeadId').value;
    const status = document.getElementById('campaignAddLeadStatus').value;
    
    if (!leadId) return alert('Informe o ID do Lead');

    try {
        const res = await fetch(`${API_URL}/campaigns/${currentCampaignId}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                leadInt: Number(leadId),
                status: status
            })
        });

        if (res.ok) {
            document.getElementById('campaignAddLeadId').value = '';
            loadCampaignLeads(currentCampaignId);
        } else {
            const err = await res.json();
            alert('Erro ao adicionar lead: ' + JSON.stringify(err));
        }
    } catch (error) {
        console.error('Error adding lead to campaign:', error);
    }
}

async function removeLeadFromCampaign(leadId) {
    if (!confirm('Remover lead da campanha?')) return;
    try {
        await fetch(`${API_URL}/campaigns/${currentCampaignId}/leads/${leadId}`, { method: 'DELETE' });
        loadCampaignLeads(currentCampaignId);
    } catch (error) {
        console.error('Error removing lead from campaign:', error);
    }
}
