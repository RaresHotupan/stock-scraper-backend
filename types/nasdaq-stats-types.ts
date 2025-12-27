export interface NasdaqStats {
    companyName: string
    marketData: MarketDaum[]
    latestIntradayData: LatestIntradayData
}

export interface MarketDaum {
    Date: string
    High: number
    Low: number
    Open: number
    Close: number
    Volume: bigint
}

export interface LatestIntradayData {
    Date: string
    High: number
    Low: number
    Open: number
    Close: number
    Change: number
    PctChange: number
    Volume: number
}
