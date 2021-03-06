const metadata = require('../artifacts/contracts/Voting.sol/VotingContract.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

task("addVoting", "Create voting")
    .addParam("addresses", "List of candidates")
    .setAction(async (taskArgs, hre) => {
        const [owner] = await hre.ethers.getSigners();   
        const Voting = await new hre.ethers.Contract(contractAddress, metadata.abi, owner);
        
        try {
            await Voting.addVoting(taskArgs.addresses.split(" "));
        }
        catch (err) {
            console.log(err.error);
        }

        console.log(`Voting with a list of candidates ${taskArgs.addresses} created`);
})