const fs = require("fs");
const Web3 = require("web3");
const mnemonic = "bike slot flush decade quit solve parent fringe open remind auction discover"
const truffleURL = "https://rinkeby.infura.io/v3/fca098e8f13544a3b30233dbe25f5b3c"
const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(mnemonic, truffleURL)
const web3 = new Web3(provider);
// const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
const bytecode = fs.readFileSync('./build/__contracts_campaign_sol_CampaignFactory.bin');
const abi = JSON.parse(fs.readFileSync('./build/__contracts_campaign_sol_CampaignFactory.abi'));
const bytecode2 = fs.readFileSync('./build/__contracts_campaign_sol_Campaign.bin');
const abi2 = JSON.parse(fs.readFileSync('./build/__contracts_campaign_sol_Campaign.abi'));
const deploy = async() => {
    accounts = await web3.eth.getAccounts()
    console.log("Trying to deploy from accounts ", accounts[0]);
    factory = await 
    new web3.eth.Contract(abi)
        .deploy({ 
            data: '0x'+bytecode, 
        }).send({
            from: accounts[0], 
            gas:'1000000'
    });
    console.log('contract factory deployed to',factory.options.address);

    campaign = await 
    new web3.eth.Contract(abi2)
        .deploy({ 
            data: '0x'+bytecode2, 
            arguments: [10,accounts[0]] 
        }).send({
            from: accounts[0], 
            gas:'1000000'
    });
    console.log('contract campaign deployed to',campaign.options.address);
    process.exit();             
};
deploy();