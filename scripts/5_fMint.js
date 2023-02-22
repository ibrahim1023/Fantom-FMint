const { FANTOM_MINT_ADDRESS_PROVIDER } = require('./common');

async function main(network) {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  const FantomMint = await ethers.getContractFactory('FantomMint');

  const fantomMint = await FantomMint.deploy();
  await fantomMint.deployed();
  console.log('FantomMint deployed at', fantomMint.address);

  await hre.run('verify:verify', {
    address: fantomMint.address,
    constructorArguments: []
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
