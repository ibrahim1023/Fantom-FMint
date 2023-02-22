async function main(network) {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  // const ConstantsManager = await ethers.getContractFactory('ConstantsManager');
  const SFC = await ethers.getContractFactory('SFC');
  const SFCI = await ethers.getContractAt('SFCI');
  // const SFCLib = await ethers.getContractFactory('SFCLib');
  // const MockToken = await ethers.getContractFactory('MockToken');
  // const StakeTokenizer = await ethers.getContractFactory('StakeTokenizer');

  const xSFC = await SFC.deploy(); //initialize
  await xSFC.deployed();
  const sfc = await SFCI.attach(xSFC.address);

  // const sfcLib = await SFCLib.deploy();
  // await sfcLib.deployed();

  // const constantsManager = await ConstantsManager.deploy();
  // await constantsManager.deployed();

  // const mockToken = await MockToken.deploy();
  // await mockToken.deployed();

  // const stakeTokenizer = await StakeTokenizer.deploy();
  // await stakeTokenizer.deployed();

  // await stakeTokenizer.initialize(sfc.address, mockToken.address);

  console.log('SFC deployed at', sfc.address);
  // console.log('sfcLib deployed at', sfcLib.address);
  // console.log('StakeTokenizer deployed at', stakeTokenizer.address);
  // console.log('ConstantsManager deployed at', constantsManager.address);

  // await hre.run('verify:verify', {
  //   address: '0xcA7E313d6ACdA529Af73781889D7CBF15F3F2Ea9',
  //   constructorArguments: []
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
