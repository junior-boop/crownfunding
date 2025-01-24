const digicode = [
    {
    letter: "A",
    code: "4LJIX"
    },
    {
    letter: "B",
    code: "qxSsG"
    },
    {
    letter: "C",
    code: "IMD5s"
    },
    {
    letter: "D",
    code: "byl3j"
    },
    {
    letter: "E",
    code: "dCLHN"
    },
    {
    letter: "F",
    code: "znihk"
    },
    {
    letter: "G",
    code: "XWwtp"
    },
    {
    letter: "H",
    code: "wb8k6"
    },
    {
    letter: "I",
    code: "BWTo5"
    },
    {
    letter: "J",
    code: "eP@sO"
    },
    {
    letter: "K",
    code: "xKVTG"
    },
    {
    letter: "L",
    code: "8c0A8"
    },
    {
    letter: "M",
    code: "9cO0C"
    },
    {
    letter: "N",
    code: "kvFT@"
    },
    {
    letter: "O",
    code: "rXQjf"
    },
    {
    letter: "P",
    code: "f_s@p"
    },
    {
    letter: "Q",
    code: "z4PxF"
    },
    {
    letter: "R",
    code: "OxZ6F"
    },
    {
    letter: "S",
    code: "PR_K_"
    },
    {
    letter: "T",
    code: "ZLdKK"
    },
    {
    letter: "U",
    code: "iAiJ6"
    },
    {
    letter: "V",
    code: "wHnTJ"
    },
    {
    letter: "W",
    code: "IsJ3Z"
    },
    {
    letter: "X",
    code: "rL_Qd"
    },
    {
    letter: "Y",
    code: "1WbLN"
    },
    {
    letter: "Z",
    code: "viCaL"
    },
    {
    letter: "a",
    code: "k54pI"
    },
    {
    letter: "b",
    code: "qdU6r"
    },
    {
    letter: "c",
    code: "SrSQe"
    },
    {
    letter: "d",
    code: "8EQKP"
    },
    {
    letter: "e",
    code: "aAU3n"
    },
    {
    letter: "f",
    code: "xLt9d"
    },
    {
    letter: "g",
    code: "dcxj_"
    },
    {
    letter: "h",
    code: "pF27D"
    },
    {
    letter: "i",
    code: "xiNyE"
    },
    {
    letter: "j",
    code: "ALxNK"
    },
    {
    letter: "k",
    code: "BUbk6"
    },
    {
    letter: "l",
    code: "qkFkH"
    },
    {
    letter: "m",
    code: "pBAO2"
    },
    {
    letter: "n",
    code: "SdFsR"
    },
    {
    letter: "o",
    code: "BH0uP"
    },
    {
    letter: "p",
    code: "p93vi"
    },
    {
    letter: "q",
    code: "JtXdX"
    },
    {
    letter: "r",
    code: "cB@oR"
    },
    {
    letter: "s",
    code: "mwkuD"
    },
    {
    letter: "t",
    code: "xJxY4"
    },
    {
    letter: "u",
    code: "Ruay6"
    },
    {
    letter: "v",
    code: "bqa2v"
    },
    {
    letter: "w",
    code: "iDLhV"
    },
    {
    letter: "x",
    code: "lPECB"
    },
    {
    letter: "y",
    code: "BvC@X"
    },
    {
    letter: "z",
    code: "_V4M@"
    },
    {
    letter: "0",
    code: "DXKLb"
    },
    {
    letter: "1",
    code: "pM4LC"
    },
    {
    letter: "2",
    code: "1N0Em"
    },
    {
    letter: "3",
    code: "_JWzN"
    },
    {
    letter: "4",
    code: "ad0RT"
    },
    {
    letter: "5",
    code: "E_Ivw"
    },
    {
    letter: "6",
    code: "yq1V6"
    },
    {
    letter: "7",
    code: "a@zU3"
    },
    {
    letter: "8",
    code: "uxjtE"
    },
    {
    letter: "9",
    code: "ML6YP"
    }
    ]


function generateHashPassword(password: string) {
    let hashPassword = '';
    for (let i = 0; i < password.length; i++) {
        for (let j = 0; j < digicode.length; j++) {
            if (password[i] === digicode[j].letter) {
                hashPassword += digicode[j].code;
            }
        }
    }
    return hashPassword;
}

export function comparePassword(password: string, hashPassword: string) {
    return generateHashPassword(password) === hashPassword;
}

export default generateHashPassword;