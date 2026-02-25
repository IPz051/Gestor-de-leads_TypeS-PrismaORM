import { Router } from "express";
import { GroupsController } from "./Controllers/groupsControllers/groupsController";
import { LeadsController } from "./Controllers/leadsControllers";
import { CampaignController } from "./Controllers/campaingControllers/campaingController";
import { CampaignLeadsController } from "./Controllers/campaingLeadsControllers/campaingLeadsController";
import { GroupsLeadsController } from "./Controllers/groupsLeadsControllers/groupsLeadsController";


const router = Router()
const leadsController = new LeadsController()
const groupsController = new GroupsController()
const campaignController = new CampaignController()
const campaingLeadsController = new CampaignLeadsController()
const groupsLeadsController = new GroupsLeadsController()



router.get('/test', (_req, res) => {
  res.send('Hello World!') 
})

router.post('/leads', leadsController.create)
router.get('/leads', leadsController.index)
router.get('/leads/:id', leadsController.show)
router.put('/leads/:id', leadsController.update)
router.delete('/leads/:id', leadsController.delete)

router.post('/groups', groupsController.create)
router.get('/groups', groupsController.index)
router.get('/groups/:id', groupsController.show)
router.put('/groups/:id', groupsController.update)
router.delete('/groups/:id', groupsController.delete)

router.get('/groups/:groupId/leads', groupsLeadsController.getLeads)
router.post('/groups/:groupId/leads', groupsLeadsController.addLeads)
router.delete('/groups/:groupId/leads/:leadId', groupsLeadsController.removeLeads)

router.post('/campaigns', campaignController.create)
router.get('/campaigns', campaignController.index)
router.get('/campaigns/:id', campaignController.show)
router.put('/campaigns/:id', campaignController.update)
router.delete('/campaigns/:id', campaignController.delete)

router.post('/campaigns/:campaignId/leads', campaingLeadsController.create)
router.get('/campaigns/:campaignId/leads', campaingLeadsController.index)
router.put('/campaigns/:campaignId/leads/:leadId', campaingLeadsController.update)
router.delete('/campaigns/:campaignId/leads/:leadId', campaingLeadsController.delete)



export default router
