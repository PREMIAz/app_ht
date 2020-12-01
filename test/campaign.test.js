const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const campaign_bytecode = fs.readFileSync('./build/__contracts_campaign_sol_Campaign.bin');
const campaign_abi = JSON.parse(fs.readFileSync('./build/__contracts_campaign_sol_Campaign.abi'));
const factory_bytecode = fs.readFileSync('./build/__contracts_campaign_sol_CampaignFactory.bin');
const factory_Abi = JSON.parse(fs.readFileSync('./build/__contracts_campaign_sol_CampaignFactory.abi'));

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await
    new web3.eth.Contract(campaign_abi)
        .deploy({
        data: '0x'+campaign_bytecode,
        arguments: [100,accounts[0]]
        }).send({
            from: accounts[0],
        gas:'1000000'
    });
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
        });
});