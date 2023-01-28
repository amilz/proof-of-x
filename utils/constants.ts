import { clusterApiUrl } from "@solana/web3.js";

export const NETWORK = process.env.NEXT_PUBLIC_RPC
    ?? clusterApiUrl('mainnet-beta');
export const TOKEN_MINT = process.env.NEXT_PUBLIC_TOKEN_MINT
    ?? 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';
export const MIN_BURN_AMT = Number(process.env.NEXT_PUBLIC_MIN_BURN_AMT)
    ?? 1000000;
export const NUM_DECIMALS = Number(process.env.NEXT_PUBLIC_NUM_DECIMALS)
    ?? 5;
export const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME
    ?? 'BONK';

export const IMG_URIS: string[] = [
    "https://arweave.net/brLBMvBhc1epsGMcGd3BIMHHNGp67O3w8BLFnuz6KB4?ext=png",
    "https://arweave.net/S40YOJwfdzGv6O9HfXYtYjs4eIyUYL4F3pmKLyOiFMA?ext=png",
    "https://arweave.net/spFzgmuTFbtHUFiUKAumcqm3NFCGuFYp_4pdZ84KK_Y?ext=png",
    "https://arweave.net/xCJDtMjSayg-Um1VDR8hSsUfAsACaNUjEE91BVaqRts?ext=png",
    "https://arweave.net/u6avFDK2qEZWv3Sy_jU2ylrBSQUYmNia3FEw6FEOd6M?ext=png",
    "https://arweave.net/d38Dr70BoX_vEO8TDj34SAYPBUEfLAbh-O-M4dB9Sfc?ext=png",
    "https://arweave.net/R1EyodNsavfvduSJ1_ye7G9eOR2_LxlP35Z8SLrg1IQ?ext=png",
    "https://arweave.net/CHBrx24sUS3p7q2pQX0b6wLEMfGtn2ByMEdQMoTsgE0?ext=png",
    "https://arweave.net/IQEleLuUqDLj-ZBZZ-0KxnzKZrVXS0E37YNFhoW6r4c?ext=png",
    "https://arweave.net/KP2yCkucDqTtbCK3605ci-tVIOi3xjKPEvzvRVw_Chs?ext=png",
    "https://arweave.net/l6mB4HlifviFqHf0SR1tjR0jPCl02rD49tq_0nndAOk?ext=png",
    "https://arweave.net/tTGfCn7LMX6YYZyCla7ARwMGX2LRx-y4f7Ax5py1ltM?ext=png",
    "https://arweave.net/Dl3FWkx6gAUq1v8TmEXbVCShMTSREVIt-7IVSrNYbp4?ext=png",
    "https://arweave.net/ILOszKonJC3HCnvwoJ7tMcynguk60vSOo7qoZlA7JCU?ext=png",
    "https://arweave.net/Zpd5CHxc1REwSPk5vbvaNA9t9DjyyxHpmi3imSQ4yQw?ext=png",
    "https://arweave.net/sggtJ61vSuKJWqUXYPJ_Tdb5Y_-vQrPIOZtPOEFjO-8?ext=png",
    "https://arweave.net/5xDgytUN0YVKOOwi-ayQ4DBEp8HX6wxKPnMmCX0Zfuk?ext=png"
];

export const IMG_10M = [
    "https://arweave.net/yCwiBc6kWC0OWJREjwMS_bt6x0f_4AHpwRHfdDya4bY?ext=png",
    "https://arweave.net/HeBz713grRBUw4GCFkmVBUb3WPTUFVlpYgS-Ge83uvw?ext=png",
    "https://arweave.net/nzTco6k5BN4m_XILIfBbgFFgTtUp_dhj5Oj68mZgQd8?ext=png",
    "https://arweave.net/xIz4AoJuErFRW_fcMuo2gkew4MIC-R0vnW0J6HDBbBo?ext=png",
    "https://arweave.net/kjejWjciBwrhA1oQw32I3AIWDSoL0AtuIwQ9J_MZ2SY?ext=png",
    "https://arweave.net/bIbBOGp5p7mvLFYf1MgRmt-oJ3fkG-_63XiqGOOCcds?ext=png",
    "https://arweave.net/3ymWK_AyUxDv-gCIDJa_3ksNYyT1oSTE9dTHV6ql0u4?ext=png",
    "https://arweave.net/EVuxMxBfY4DOajkIPwINapDBVf9mKkxrOh0eGvizAEA?ext=png",
    "https://arweave.net/mB_1L3e5uVqLkNsdxAkSrRXZyXNvjHTOq0WphTwT7l0?ext=png",
    "https://arweave.net/xmURP6N-00afnp67sVazoH6cpWPjic9UCmiIFQEaGyE?ext=png",
    "https://arweave.net/VUTODfUvt_xGLnIHIDIqrqLcW5dRV1bNTCtXrmSP_1Q?ext=png",
    "https://arweave.net/2EneK8VvIbBAHtuM7zApIL4hNgvUOQt2e5aoN6XDbk4?ext=png"
];

export const IMG_100M = [
    "https://arweave.net/ct7Is1qs-v9sqPY0ZYhytO13jGpUDc1X0GlDDfWjGQk?ext=png",
    "https://arweave.net/wFi8kuJuVq3n7DzUdCS1-c8p1qZhR4X0Zm8f1WYWfbA?ext=png",
    "https://arweave.net/HS3qeL-RZWgYsnU_Ouj8qdUfYPxgAg1xl5bPdOp966U?ext=png",
    "https://arweave.net/R74zd49t25RhDC25_Ld88RjQ-0LRxlc9iRt7TnEHZOI?ext=png",
    "https://arweave.net/xIg1v_3F3tiqlI2T_-OOtukEhSBMKKlBYCGR8ADCvMU?ext=png",
    "https://arweave.net/mIWaC-DsFcT6hokI5bnA3ibSYxQpXMGUiEVTS_HpxL4?ext=png",
    "https://arweave.net/GtjamlPtjcNhwBeZI4KCOV2y0bBb727z3gcgQKPh9vc?ext=png",
    "https://arweave.net/8CME_Lej1VsNFnc1o2fMRRrNrFBFiCNt8aIEc5e7Dog?ext=png",
    "https://arweave.net/sEgjzyiuea6Fck_IvrJZ4LVEbyrVdPxbGkj5kPAjs0s?ext=png",
    "https://arweave.net/ihaAF7qWj1RiSG_QKD2jQ9ntjrQwsQFst9fxSWIOryk?ext=png",
    "https://arweave.net/SacRIdi_sKbHyYgkMxUfCOS6vaeADVpFyQ6-yVAVHqU?ext=png",
    "https://arweave.net/lr7AOfYH1Sxbu6XoetezYtIjIFTwvENszI8vWE9cbU0?ext=png",
    "https://arweave.net/fd_F5GFXpQhysRlE1bouwa6aF4_6j4uglUVBgaYE3oU?ext=png"
];

export const IMG_1B = ["https://arweave.net/ntkO4DPMthTKb3FbZMhKfUh7I--EGbjAM4oQ_iXtkd0?ext=png"];