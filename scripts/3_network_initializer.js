async function main(network) {
  const [deployer] = await ethers.getSigners();

  const NodeDriver = await ethers.getContractFactory('NodeDriver');
  const NodeDriverAuth = await ethers.getContractFactory('NodeDriverAuth');
  const StubEvmWriter = await ethers.getContractFactory('StubEvmWriter');

  const NetworkInitializer = await ethers.getContractFactory(
    'NetworkInitializer'
  );
  const SFCToFMint = await ethers.getContractFactory('SFCToFMint');

  const nodeDriver = await NodeDriver.deploy();
  await nodeDriver.deployed();

  const nodeDriverAuth = await NodeDriverAuth.deploy();
  await nodeDriverAuth.deployed();

  const evmWriter = await StubEvmWriter.deploy();
  await evmWriter.deployed();

  const networkInitializer = await NetworkInitializer.deploy(); //initialize
  await networkInitializer.deployed();

  console.log('NetworkInitializer deployed at', networkInitializer.address);
  console.log('nodeDriver deployed at', nodeDriver.address);
  console.log('nodeDriverAuth deployed at', nodeDriverAuth.address);
  console.log('evmWriter deployed at', evmWriter.address);

  // await hre.run('verify:verify', {
  //   address: networkInitializer.address,
  //   constructorArguments: []
  // });

  // await networkInitializer.initializeAll(
  //   12,
  //   0,
  //   '0xe7AFB0a70B1E9028B734175A36D667F0577DB7E6',
  //   '0x7A3f648CbA5b572ef8F1B592c7E00C333831ED25',
  //   nodeDriverAuth.address,
  //   nodeDriver.address,
  //   evmWriter.address,
  //   '0xD5a4a401e6762171B4201ADc5032f2649c4E0Cf5'
  // );

  const sfcToFMint = await SFCToFMint.deploy(
    '0xF553900D56bb18a65612704fccB3DC299FD07e15',
    '0xD09196C7eF1Ff46c214AF55628f703C4b2D67218'
  );

  await sfcToFMint.deployed();

  console.log('SFCToFMint deployed at', sfcToFMint.address);

  // await hre.run('verify:verify', {
  //   address: sfcToFMint.address,
  //   constructorArguments: [
  //     '0x7A3f648CbA5b572ef8F1B592c7E00C333831ED25',
  //     '0xe7AFB0a70B1E9028B734175A36D667F0577DB7E6',
  //     '0xcEa5dA35C33FC5545fA7b0124d373646948d4e94'
  //   ]
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
