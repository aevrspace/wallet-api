//  ./src/graphql/typeDefs/transfer.typeDefs.ts

export const transferTypeDefs = `#graphql
  # Input type for transferring assets to another user
  input TransferAssetsInput {
    toUserId: ID
    toAddress: String
    amount: Float!
    symbol: String!
    network: String!
    description: String
  }

  # Input type for internal wallet-to-wallet transfers
  input InternalTransferInput {
    fromSymbol: String!
    toSymbol: String!
    amount: Float!
  }

  # Input type for transfer fee calculation
  input TransferFeeInput {
    symbol: String!
    amount: Float!
    network: String!
  }

  # Meta information for transfer history
  type TransferHistoryMeta {
    total: Int
    page: Int
    limit: Int
    pages: Int
  }

  # Transfer recipient information
  type TransferRecipient {
    address: String
    name: String
    userId: String
    appId: String
  }

  # Transfer receipt information
  type TransferReceipt {
    id: ID
    userId: String
    amount: String
    symbol: String
    fee: String
    description: String
    status: String
    from: String
    to: String
    createdAt: String
    updatedAt: String
  }

  # Transfer history item
  type TransferHistoryItem {
    id: ID
    userId: String
    accountId: String
    amount: String
    symbol: String
    fee: String
    description: String
    status: String
    from: String
    to: String
    type: String
    recipient: TransferRecipient
    wallet: UserWallet
    createdAt: String
    updatedAt: String
  }

  # Pagination information for transfer history
  type TransferPagination {
    total: Int
    currentPage: Int
    totalPages: Int
  }


  # Transfer history response
  type TransferHistoryData {
    data: [TransferHistoryItem]
    meta: TransferHistoryMeta
  }

  # Fee details for transfers
  type TransferFeeDetails {
    total: String
    network: String
    service: String
  }

  # Fee calculation response data
  type FeeCalculationData {
    fee: Float,
    symbol: String,
    transferType: String,
    minTransfer: Float,
    maxTransfer: Float
  }

  # Fee calculation response
  type FeeCalculationResponse {
    data: FeeCalculationData
    wallet: UserWallet
  }

  # Currency conversion preview
  type ConversionPreview {
    fromAmount: String
    toAmount: String
    rate: String
    fromSymbol: String
    toSymbol: String
    fee: String
  }

  # Transfer asset response data
  type TransferAssetData {
    receipt: TransferReceipt
    transactionId: String
    timestamp: String
  }

  # Transfer asset response
  type TransferAssetResponse {
    status: String
    message: String
    data: TransferAssetData
    fromWallet: UserWallet
    toWallet: String
  }

  # Bank details
  type Bank {
    name: String
    alias: [String]
    routingKey: String
    logoImage: String
    bankCode: String
    categoryId: String
    nubanCode: String
  }

  # Bank list response
  type BankListResponse {
    banks: [Bank]
    count: Int
  }

  # Verify bank input
  input VerifyBankInput {
    bankCode: String!
    accountNumber: String!
  }

  # Verify bank response
  type VerifyBankResponse {
    accountName: String
    accountNumber: String
    bankCode: String
    bankName: String
    verified: Boolean
  }

  # Bank transfer data
  type BankTransferData {
    amount: Float
    beneficiaryAccountName: String
    beneficiaryAccountNumber: String
    beneficiaryBankCode: String
    narration: String
    paymentReference: String
    saveBeneficiary: Boolean
  }

  # Bank transfer response
  type BankTransferResponse {
    message: String
    data: BankTransferData
  }

  # Bank transfer input
  input BankTransferInput {
    beneficiaryBankCode: String!
    beneficiaryAccountNumber: String!
    beneficiaryAccountName: String!
    amount: Float!
    narration: String!
    paymentReference: String!
    saveBeneficiary: Boolean!
  }

  extend type Query {
    # Get transfer history for the authenticated user
    getTransferHistory(pagination: Pagination, symbols: [String]): TransferHistoryData

    # Calculate transfer fee for a transaction
    calculateTransferFee(input: TransferFeeInput!): FeeCalculationResponse

    # Bank List
    getBanks: BankListResponse
  }

  extend type Mutation {
    # Transfer assets to another user
    transferAssets(input: TransferAssetsInput): TransferAssetResponse
    # Verify bank
    verifyBank(input: VerifyBankInput): VerifyBankResponse
    # Perform a bank transfer
    transferToBank(input: BankTransferInput): BankTransferResponse
  }
`;
