const { FANTOM_FUSD, etherToWei } = require('./common');

async function main(network) {
  let wFTMAddress;

  // const MockToken = await ethers.getContractFactory('MockToken');
  const MockPriceOracleProxy = await ethers.getContractFactory(
    'MockPriceOracleProxy'
  );

  // const mockToken = await MockToken.deploy();
  // await mockToken.deployed();
  // console.log('MockToken deployed at', mockToken.address);
  // wFTMAddress = mockToken.address;

  // await hre.run('verify:verify', {
  //   address: mockToken.address,
  //   constructorArguments: []
  // });

  // await mockToken.initialize('wFTM', 'wFTM', 18);

  const mockPriceOracleProxy = await MockPriceOracleProxy.deploy();
  await mockPriceOracleProxy.deployed();
  console.log('MockPriceOracleProxy deployed at', mockPriceOracleProxy.address);

  // await hre.run('verify:verify', {
  //   address: mockPriceOracleProxy.address,
  //   constructorArguments: []
  // });

  await mockPriceOracleProxy.setPrice(
    '0x92d089173611D91256FE4711b97c030955E2A235',
    etherToWei(1).toString()
  );

  await mockPriceOracleProxy.setPrice(FANTOM_FUSD, etherToWei(1).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
