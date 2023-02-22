async function main(network) {
  console.log('network: ', network.name);

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(`Deployer's address: `, deployerAddress);

  const FantomMintAddressProvider = await ethers.getContractFactory(
    'FantomMintAddressProvider'
  );

  const fantomMintAddressProvider = await FantomMintAddressProvider.deploy();
  await fantomMintAddressProvider.deployed();
  await fantomMintAddressProvider.initialize(deployerAddress);
  console.log(
    'FantomMintAddressProvider deployed at',
    fantomMintAddressProvider.address
  );

  await hre.run('verify:verify', {
    address: fantomMintAddressProvider.address,
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
