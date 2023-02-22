async function main(network) {
  const FantomFUSD = await ethers.getContractFactory('FantomFUSD');

  const fantomFUSD = await FantomFUSD.deploy();
  await fantomFUSD.deployed();
  console.log('FantomFUSD deployed at', fantomFUSD.address);

  await hre.run('verify:verify', {
    address: fantomFUSD.address,
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
