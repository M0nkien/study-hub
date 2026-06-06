const ccnaQuizData = [
    {
        "id": "ccna-ethernet-llc-ipv6",
        "title": "CCNA – Ethernet, LLC, IPv6, rámce a optika",
        "questions": [
            {
                "text": "Ktoré dve tvrdenia popisujú vlastnosti alebo funkcie podvrstvy LLC v štandarde Ethernet?",
                "choose": 2,
                "answers": [
                    {
                        "text": "LLC je implementovaná ako softvérový program, teda ako súčasť ovládača sieťového zariadenia.",
                        "correct": true
                    },
                    {
                        "text": "Linková vrstva používa LLC na komunikáciu s vyššou vrstvou protokolovej sady, teda s vrstvou L3.",
                        "correct": true
                    },
                    {
                        "text": "LLC je špecifikovaná v štandarde IEEE 802.3.",
                        "correct": false
                    },
                    {
                        "text": "LLC pridáva k dátam hlavičku a pätu vrátane adries, začiatku a konca rámca.",
                        "correct": false
                    },
                    {
                        "text": "LLC je zodpovedná za vkladanie rámcov na fyzické médium a ich výber z média.",
                        "correct": false
                    }
                ],
                "explanation": "LLC komunikuje s vyššou vrstvou, teda s L3. MAC podvrstva rieši rámce, MAC adresy a prístup k médiu."
            },
            {
                "text": "Ktoré tvrdenie popisuje Ethernet?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Definuje najpoužívanejšiu prenosovú technológiu, teda štandard pre lokálne siete LAN.",
                        "correct": true
                    },
                    {
                        "text": "Prepája koncové stanice cez smerovače umiestnené v rôznych krajinách.",
                        "correct": false
                    },
                    {
                        "text": "Definuje štandardný režim popisujúci, ako PC sieť pracuje.",
                        "correct": false
                    },
                    {
                        "text": "Je nevyhnutným štandardom prvej a druhej vrstvy pre internetovú komunikáciu.",
                        "correct": false
                    }
                ],
                "explanation": "Ethernet je najčastejšie používaná technológia v LAN sieťach a pracuje najmä na 1. a 2. vrstve OSI modelu."
            },
            {
                "text": "Ktorú výhodu ponúka IPv6 hlavička v porovnaní s IPv4 hlavičkou? Prečo je spracovanie IPv6 paketu efektívnejšie?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Má menší počet položiek v hlavičke.",
                        "correct": true
                    },
                    {
                        "text": "Požiadavky na spracovanie kontrolného súčtu sú minimálne.",
                        "correct": false
                    },
                    {
                        "text": "Má menšiu veľkosť hlavičky.",
                        "correct": false
                    },
                    {
                        "text": "Má menšie polia pre zdrojovú a cieľovú adresu.",
                        "correct": false
                    }
                ],
                "explanation": "IPv6 hlavička má jednoduchšiu štruktúru a menej polí. IPv6 adresa je väčšia ako IPv4 adresa, ale formát hlavičky je efektívnejší."
            },
            {
                "text": "Čo obsahuje päta rámca, teda trailer?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Kontrolný súčet na vykonanie detekcie chýb.",
                        "correct": true
                    },
                    {
                        "text": "Dáta pre príjemcu.",
                        "correct": false
                    },
                    {
                        "text": "Fyzickú adresu odosielateľa.",
                        "correct": false
                    },
                    {
                        "text": "Logickú adresu odosielateľa.",
                        "correct": false
                    }
                ],
                "explanation": "Trailer ethernetového rámca obsahuje FCS, teda Frame Check Sequence, ktorá slúži na detekciu chýb."
            },
            {
                "text": "Prečo sú zvyčajne použité dve vlákna v jednom optickom spojení?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Povoľujú plne duplexnú komunikáciu.",
                        "correct": true
                    },
                    {
                        "text": "Zvyšujú rýchlosť prenosu dát.",
                        "correct": false
                    },
                    {
                        "text": "Dve vlákna dovoľujú prenášať signál na väčšie vzdialenosti bez útlmu.",
                        "correct": false
                    },
                    {
                        "text": "Predchádzajú presluchom, teda crosstalku, na spojení.",
                        "correct": false
                    }
                ],
                "explanation": "Pri optike sa často používa jedno vlákno na vysielanie a druhé na prijímanie. Tak je možná full-duplex komunikácia."
            },
            {
                "text": "Ktorý konektor sa používa pri ethernetovom kábli s krútenou dvojlinkou?",
                "choose": 1,
                "answers": [
                    {
                        "text": "RJ-45",
                        "correct": true
                    },
                    {
                        "text": "PS/2",
                        "correct": false
                    },
                    {
                        "text": "RJ-11",
                        "correct": false
                    },
                    {
                        "text": "DIN",
                        "correct": false
                    }
                ],
                "explanation": "Ethernet cez metalický kábel, napríklad UTP, používa konektor RJ-45. RJ-11 sa používa najmä pri telefónnych linkách."
            }
        ]
    },
    {
        "id": "ccna-kapitola-9-arp-rozlisenie-adresy",
        "title": "CCNA – Kapitola 9: Rozlíšenie adresy ARP/ND",
        "questions": [
            {
                "text": "Čo je útok pomocou ARP?",
                "choose": 1,
                "answers": [
                    {
                        "text": "ARP poisoning",
                        "correct": true
                    },
                    {
                        "text": "ARP hopping attacks",
                        "correct": false
                    },
                    {
                        "text": "ARP starvation",
                        "correct": false
                    },
                    {
                        "text": "ARP broadcast",
                        "correct": false
                    }
                ],
                "explanation": "Útok pomocou ARP sa nazýva ARP poisoning. Útočník sa snaží podvrhnúť ARP záznamy a presmerovať komunikáciu cez seba."
            },
            {
                "text": "Aké dve funkcie poskytuje ARP?",
                "choose": 2,
                "answers": [
                    {
                        "text": "Rozdeľuje, teda mapuje, adresy IPv4 na adresy MAC.",
                        "correct": true
                    },
                    {
                        "text": "Udržiava tabuľku mapovaní adries IPv4 na adresy MAC.",
                        "correct": true
                    },
                    {
                        "text": "Udržiava tabuľku adries IPv4 k názvom domén.",
                        "correct": false
                    },
                    {
                        "text": "Rozdeľuje adresy IPv6 na adresy MAC.",
                        "correct": false
                    },
                    {
                        "text": "Rozdeľuje adresy IPv4 na názvy domén.",
                        "correct": false
                    },
                    {
                        "text": "Udržiava tabuľku mapovaní adries IPv6 na adresy MAC.",
                        "correct": false
                    }
                ],
                "explanation": "ARP slúži pri IPv4 na zistenie MAC adresy k známej IPv4 adrese a ukladá tieto mapovania do ARP tabuľky."
            },
            {
                "text": "Aká cieľová MAC adresa bude zahrnutá v rámci odoslanom zo zdrojového zariadenia do cieľového zariadenia vo vzdialenej lokálnej sieti?",
                "choose": 1,
                "answers": [
                    {
                        "text": "MAC adresa rozhrania lokálneho smerovača.",
                        "correct": true
                    },
                    {
                        "text": "Vysielacia MAC adresa FF-FF-FF-FF-FF-FF.",
                        "correct": false
                    },
                    {
                        "text": "MAC adresa cieľového zariadenia.",
                        "correct": false
                    }
                ],
                "explanation": "Ak je cieľ v inej sieti, zdrojové zariadenie neposiela rámec priamo na MAC cieľa. Ako cieľovú MAC použije MAC adresu svojej predvolenej brány, teda lokálneho smerovača."
            },
            {
                "text": "Kde je v zariadení uložená tabuľka ARP?",
                "choose": 1,
                "answers": [
                    {
                        "text": "RAM",
                        "correct": true
                    },
                    {
                        "text": "ROM",
                        "correct": false
                    },
                    {
                        "text": "Flash",
                        "correct": false
                    },
                    {
                        "text": "NVRAM",
                        "correct": false
                    }
                ],
                "explanation": "ARP tabuľka je dočasná tabuľka uložená v operačnej pamäti RAM. Záznamy sa môžu časom vymazať."
            },
            {
                "text": "Aké dva protokoly sa používajú na určenie MAC adresy zo známej IP adresy cieľového zariadenia pri IPv4 aj IPv6?",
                "choose": 2,
                "answers": [
                    {
                        "text": "ARP",
                        "correct": true
                    },
                    {
                        "text": "ND",
                        "correct": true
                    },
                    {
                        "text": "DNS",
                        "correct": false
                    },
                    {
                        "text": "DHCP",
                        "correct": false
                    }
                ],
                "explanation": "Pri IPv4 sa používa ARP. Pri IPv6 sa používa Neighbor Discovery, skrátene ND."
            },
            {
                "text": "Ktorý príkaz možno použiť na smerovači Cisco na zobrazenie tabuľky ARP?",
                "choose": 1,
                "answers": [
                    {
                        "text": "show ip arp",
                        "correct": true
                    },
                    {
                        "text": "arp -d",
                        "correct": false
                    },
                    {
                        "text": "arp -a",
                        "correct": false
                    },
                    {
                        "text": "show arp table",
                        "correct": false
                    }
                ],
                "explanation": "Na Cisco smerovači sa ARP tabuľka zobrazí príkazom show ip arp."
            },
            {
                "text": "Ktoré tvrdenie o ARP je pravdivé?",
                "choose": 1,
                "answers": [
                    {
                        "text": "Záznamy ARP sa dočasne ukladajú do vyrovnávacej pamäte.",
                        "correct": true
                    },
                    {
                        "text": "Záznamy ARP sú permanentne uložené do vyrovnávacej pamäte.",
                        "correct": false
                    },
                    {
                        "text": "Vyrovnávaciu pamäť ARP nemožno ručne vymazať.",
                        "correct": false
                    }
                ],
                "explanation": "ARP záznamy sú dočasné. Ukladajú sa do ARP cache a po určitom čase môžu expirovať. Cache sa dá podľa zariadenia alebo systému aj ručne vymazať."
            }
        ]
    }
];
