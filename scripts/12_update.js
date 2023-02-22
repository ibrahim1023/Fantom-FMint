const {
  wFTM,
  MOCK_ORACLE_PROXY,
  FANTOM_FMINT,
  FANTOM_MINT_TOKEN_REGISTRY,
  FANTOM_LIQUIDATION_MANAGER,
  FANTOM_FUSD,
  FANTOM_MINT_ADDRESS_PROVIDER,
  SFC_TO_FMINT
} = require('./common');

async function main(network) {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  const FantomMintAddressProvider = await ethers.getContractFactory(
    'FantomMintAddressProvider'
  );

  const FantomMintTokenRegistry = await ethers.getContractFactory(
    'FantomMintTokenRegistry'
  );

  const FantomLiquidationManager = await ethers.getContractFactory(
    'FantomLiquidationManager'
  );
  const FantomMint = await ethers.getContractFactory('FantomMint');

  const fantomMintAddressProvider = await FantomMintAddressProvider.attach(
    FANTOM_MINT_ADDRESS_PROVIDER
  );
  const fantomMintTokenRegistry = await FantomMintTokenRegistry.attach(
    FANTOM_MINT_TOKEN_REGISTRY
  );
  const fantomLiquidationManager = await FantomLiquidationManager.attach(
    FANTOM_LIQUIDATION_MANAGER
  );
  const fantomMint = await FantomMint.attach(FANTOM_FMINT);

  await fantomMintAddressProvider.setFantomMint(FANTOM_FMINT);
  await fantomMintAddressProvider.setCollateralPool(
    '0xaDD94CeE531d200ad2707eF8f6F21F7CA6856E1e'
  );
  await fantomMintAddressProvider.setDebtPool(
    '0x999F01990cce84Cd6196F051A7C51b18Ac42e897'
  );
  await fantomMintAddressProvider.setTokenRegistry(FANTOM_MINT_TOKEN_REGISTRY);
  await fantomMintAddressProvider.setRewardDistribution(
    '0xF0b5640a926473cC950c1a7DAc8f5f4c01b3E0d5'
  );
  await fantomMintAddressProvider.setPriceOracleProxy(MOCK_ORACLE_PROXY);
  await fantomMintAddressProvider.setFantomLiquidationManager(
    FANTOM_LIQUIDATION_MANAGER
  );

  // await fantomMint.initialize(deployerAddress, FANTOM_MINT_ADDRESS_PROVIDER);

  await fantomMintTokenRegistry.initialize(deployerAddress);
  await fantomMintTokenRegistry.addToken(
    wFTM,
    '',
    MOCK_ORACLE_PROXY,
    18,
    true,
    true,
    false,
    true
  );

  await fantomLiquidationManager.initialize(
    deployerAddress,
    FANTOM_MINT_ADDRESS_PROVIDER,
    SFC_TO_FMINT
  );

  await fantomLiquidationManager.updateFantomMintContractAddress(FANTOM_FMINT);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
