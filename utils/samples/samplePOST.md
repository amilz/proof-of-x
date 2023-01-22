curl -X POST "http://localhost:3000/api/burn" \
  -H "Content-Type: application/json" \
  -H "authorization: YOUR_AUTH" \
  -d '[
      {
    "accountData": [
        {
            "account": "Cw9PKetp1vodUfbL1whv2wDVTD5f5UhGq5GT6iFg4J1E",
            "nativeBalanceChange": -5000,
            "tokenBalanceChanges": []
        },
        {
            "account": "CQ7T7r95gcD9w5zR5GKjGqQ7ugXfT1KLnwAM2g5XQXjN",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": [
                {
                    "mint": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
                    "rawTokenAmount": {
                        "decimals": 5,
                        "tokenAmount": "-5567859787"
                    },
                    "tokenAccount": "CQ7T7r95gcD9w5zR5GKjGqQ7ugXfT1KLnwAM2g5XQXjN",
                    "userAccount": "Cw9PKetp1vodUfbL1whv2wDVTD5f5UhGq5GT6iFg4J1E"
                }
            ]
        },
        {
            "account": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        }
    ],
    "description": "Cw9PKetp1vodUfbL1whv2wDVTD5f5UhGq5GT6iFg4J1E burned 55678.59787 Bonk.",
    "events": {},
    "fee": 5000,
    "feePayer": "Cw9PKetp1vodUfbL1whv2wDVTD5f5UhGq5GT6iFg4J1E",
    "instructions": [
        {
            "accounts": [
                "CQ7T7r95gcD9w5zR5GKjGqQ7ugXfT1KLnwAM2g5XQXjN",
                "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
                "Cw9PKetp1vodUfbL1whv2wDVTD5f5UhGq5GT6iFg4J1E"
            ],
            "data": "78EXLGcfEJTq",
            "innerInstructions": [],
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
    ],
    "nativeTransfers": [],
    "signature": "JWSnRciiny8Z72GdYNcm2uWTa3dzovnuUmx3NqhoGcucSRJbh9yEX9osr5aNKwTwqeoGN6Ykodnqx4dvJ7AJoDR",
    "slot": 173237365,
    "source": "SOLANA_PROGRAM_LIBRARY",
    "timestamp": 1674099320,
    "tokenTransfers": [
        {
            "fromTokenAccount": "CQ7T7r95gcD9w5zR5GKjGqQ7ugXfT1KLnwAM2g5XQXjN",
            "fromUserAccount": "Cw9PKetp1vodUfbL1whv2wDVTD5f5UhGq5GT6iFg4J1E",
            "mint": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
            "toTokenAccount": "",
            "toUserAccount": "",
            "tokenAmount": 10055678.59787,
            "tokenStandard": "Fungible"
        }
    ],
    "transactionError": null,
    "type": "BURN"
}
  ]'