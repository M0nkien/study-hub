const linuxQuizData = [
    {
        "id": "test1",
        "title": "Test 1 – Linux základy, shell, súbory, kompresia",
        "questions": [
            {
                "text": "The most popular Linux platform for mobile phones is:",
                "answers": [
                    {
                        "text": "BlackBerry",
                        "correct": false
                    },
                    {
                        "text": "Android",
                        "correct": true
                    },
                    {
                        "text": "Slackware",
                        "correct": false
                    },
                    {
                        "text": "iOS",
                        "correct": false
                    },
                    {
                        "text": "MobileLinux",
                        "correct": false
                    }
                ],
                "explanation": "Android je Linux-based mobilný operačný systém."
            },
            {
                "text": "The release cycle:",
                "answers": [
                    {
                        "text": "Describes how long software will be supported",
                        "correct": false
                    },
                    {
                        "text": "Dictates how often software is updated",
                        "correct": true
                    },
                    {
                        "text": "Should be long so that you have time before you need to upgrade",
                        "correct": false
                    },
                    {
                        "text": "Should be short so you always have the freshest releases",
                        "correct": false
                    },
                    {
                        "text": "Only has meaning for paid software",
                        "correct": false
                    }
                ],
                "explanation": "Release cycle = ako často vychádzajú nové verzie/aktualizácie."
            },
            {
                "text": "What does a distribution provide to add and remove software from the system?",
                "answers": [
                    {
                        "text": "Bash",
                        "correct": false
                    },
                    {
                        "text": "Partitioning tool",
                        "correct": false
                    },
                    {
                        "text": "Compiler",
                        "correct": false
                    },
                    {
                        "text": "Application Programming Interface (API)",
                        "correct": false
                    },
                    {
                        "text": "Package Manager",
                        "correct": true
                    }
                ],
                "explanation": "Package manager inštaluje, aktualizuje a odstraňuje softvér."
            },
            {
                "text": "A maintenance cycle:",
                "answers": [
                    {
                        "text": "Describes how long a version of software will be supported",
                        "correct": true
                    },
                    {
                        "text": "Should be short so you always have the freshest releases",
                        "correct": false
                    },
                    {
                        "text": "Should be long so that you have time before you need to upgrade",
                        "correct": false
                    },
                    {
                        "text": "Describes how often updates for software come out",
                        "correct": false
                    },
                    {
                        "text": "Only has meaning for paid software",
                        "correct": false
                    }
                ],
                "explanation": "Maintenance cycle = ako dlho je konkrétna verzia podporovaná."
            },
            {
                "text": "When choosing a distribution of Linux, you should consider:",
                "answers": [
                    {
                        "text": "If the application software is supported by the distribution",
                        "correct": true
                    },
                    {
                        "text": "Will commercial support be required for the OS",
                        "correct": true
                    },
                    {
                        "text": "Does the distribution offer a stable version",
                        "correct": true
                    },
                    {
                        "text": "Popularity on social media",
                        "correct": false
                    },
                    {
                        "text": "Will users require a GUI",
                        "correct": true
                    },
                    {
                        "text": "Does your organization require long-term support for the system",
                        "correct": true
                    }
                ],
                "choose": 5
            },
            {
                "text": "Which of the following are examples of desktop software?",
                "answers": [
                    {
                        "text": "Web browser",
                        "correct": true
                    },
                    {
                        "text": "Web server",
                        "correct": false
                    },
                    {
                        "text": "Compiler",
                        "correct": false
                    },
                    {
                        "text": "Music player",
                        "correct": true
                    },
                    {
                        "text": "File share",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which of the following pieces of software deal with file sharing?",
                "answers": [
                    {
                        "text": "PostgreSQL",
                        "correct": false
                    },
                    {
                        "text": "X-Windows",
                        "correct": false
                    },
                    {
                        "text": "Samba",
                        "correct": true
                    },
                    {
                        "text": "NFS",
                        "correct": true
                    },
                    {
                        "text": "Netatalk",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "The Linux shell:",
                "answers": [
                    {
                        "text": "Has a built-in text editor",
                        "correct": false
                    },
                    {
                        "text": "Is customizable",
                        "correct": true
                    },
                    {
                        "text": "Has a scripting language",
                        "correct": true
                    },
                    {
                        "text": "Is responsible for tracking the location of configuration files",
                        "correct": false
                    },
                    {
                        "text": "Allows you to launch programs",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "Virtualization means:",
                "answers": [
                    {
                        "text": "Many users can share one hard drive",
                        "correct": false
                    },
                    {
                        "text": "A single host can be split up into multiple guests",
                        "correct": true
                    },
                    {
                        "text": "Two users get different memory spaces on the same machine",
                        "correct": false
                    },
                    {
                        "text": "A machine can swap memory to disk",
                        "correct": false
                    },
                    {
                        "text": "A user can connect to a server over the network and use a virtual console",
                        "correct": false
                    }
                ]
            },
            {
                "text": "In graphical mode, you can get to a shell by running which applications?",
                "answers": [
                    {
                        "text": "Xterm",
                        "correct": true
                    },
                    {
                        "text": "console",
                        "correct": false
                    },
                    {
                        "text": "Gbash",
                        "correct": false
                    },
                    {
                        "text": "Terminal",
                        "correct": true
                    },
                    {
                        "text": "Guiterm",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "Source code refers to:",
                "answers": [
                    {
                        "text": "The interface that software uses to talk to the kernel",
                        "correct": false
                    },
                    {
                        "text": "The version of a program that the computer runs on the CPU",
                        "correct": false
                    },
                    {
                        "text": "A human-readable version of computer software",
                        "correct": true
                    },
                    {
                        "text": "The license that dictates how you may use and share the software",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Open source means:",
                "answers": [
                    {
                        "text": "You cannot charge anything for the software",
                        "correct": false
                    },
                    {
                        "text": "You can view the software’s source code",
                        "correct": true
                    },
                    {
                        "text": "You can modify the software’s source code",
                        "correct": true
                    },
                    {
                        "text": "You must support the software you share",
                        "correct": false
                    },
                    {
                        "text": "You must share your changes",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "A copyleft provision in a software license means:",
                "answers": [
                    {
                        "text": "You give up your copyright to the software",
                        "correct": false
                    },
                    {
                        "text": "You may not link against third party closed source software",
                        "correct": false
                    },
                    {
                        "text": "You must provide free copies of the software if you use it",
                        "correct": false
                    },
                    {
                        "text": "You must provide support for your modifications",
                        "correct": false
                    },
                    {
                        "text": "If you redistribute the software, you must distribute the source to any changes you make",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Linux is distributed under which license?",
                "answers": [
                    {
                        "text": "MIT",
                        "correct": false
                    },
                    {
                        "text": "GPLv2",
                        "correct": true
                    },
                    {
                        "text": "BSD",
                        "correct": false
                    },
                    {
                        "text": "Linux Foundation",
                        "correct": false
                    },
                    {
                        "text": "GPLv3",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Creative Commons licenses allow you to:",
                "answers": [
                    {
                        "text": "Allow or disallow commercial use",
                        "correct": true
                    },
                    {
                        "text": "Specify whether or not changes must be shared",
                        "correct": true
                    },
                    {
                        "text": "Receive royalties on the use of the work",
                        "correct": false
                    },
                    {
                        "text": "Get a veto on where the work is used",
                        "correct": false
                    },
                    {
                        "text": "Specify whether or not people may distribute changes",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "Which environment variable contains a list of directories that is searched for commands to execute?",
                "answers": [
                    {
                        "text": "PATH",
                        "correct": true
                    },
                    {
                        "text": "PS2",
                        "correct": false
                    },
                    {
                        "text": "PS1",
                        "correct": false
                    },
                    {
                        "text": "EXEC",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Select the command that can report the location of a command:",
                "answers": [
                    {
                        "text": "what",
                        "correct": false
                    },
                    {
                        "text": "which",
                        "correct": true
                    },
                    {
                        "text": "where",
                        "correct": false
                    }
                ]
            },
            {
                "text": "A pair of double quotes (\" \" ) will prevent the shell from interpreting any metacharacter.",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "False, lebo v dvojitých úvodzovkách sa napr. premenné stále expandujú."
            },
            {
                "text": "The shell program interprets the commands you type into the terminal into instructions that the Linux operating system can execute.",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The acronym CLI stands for:",
                "answers": [
                    {
                        "text": "Command Line Interface",
                        "correct": true
                    },
                    {
                        "text": "Computer Line Interface",
                        "correct": false
                    },
                    {
                        "text": "Computer Link Interpreter",
                        "correct": false
                    },
                    {
                        "text": "Command Line Interpreter",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The most common shell used for Linux distributions is the ________ shell.",
                "answers": [
                    {
                        "text": "Zsh",
                        "correct": false
                    },
                    {
                        "text": "Tcsh",
                        "correct": false
                    },
                    {
                        "text": "Fish",
                        "correct": false
                    },
                    {
                        "text": "Bash",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Which two pager commands are used by the man command to control movement within the document?",
                "answers": [
                    {
                        "text": "more",
                        "correct": true
                    },
                    {
                        "text": "grep",
                        "correct": false
                    },
                    {
                        "text": "page",
                        "correct": false
                    },
                    {
                        "text": "less",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "To search the man page sections for the keyword example, which of the following command lines could you execute?",
                "answers": [
                    {
                        "text": "whatis example",
                        "correct": false
                    },
                    {
                        "text": "man -k example",
                        "correct": true
                    },
                    {
                        "text": "apropos example",
                        "correct": true
                    },
                    {
                        "text": "man -f example",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "The statement that describes the difference between a man page and an info page is:",
                "answers": [
                    {
                        "text": "The man page is a long detailed reference; the info page is very terse.",
                        "correct": false
                    },
                    {
                        "text": "The man page is like a guide; the info page is a more concise reference.",
                        "correct": false
                    },
                    {
                        "text": "The info page is like a guide; a man page is a more concise reference.",
                        "correct": true
                    },
                    {
                        "text": "There is very little difference between them.",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The following sections commonly appear on a man page:",
                "answers": [
                    {
                        "text": "SYNOPSIS",
                        "correct": true
                    },
                    {
                        "text": "LICENSE",
                        "correct": false
                    },
                    {
                        "text": "DESCRIPTION",
                        "correct": true
                    },
                    {
                        "text": "NAME",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "The top-level directory on a Linux system is represented as:",
                "answers": [
                    {
                        "text": "/",
                        "correct": true
                    },
                    {
                        "text": "/home",
                        "correct": false
                    },
                    {
                        "text": "/root",
                        "correct": false
                    },
                    {
                        "text": "C:",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The tilde (~) is used to represent:",
                "answers": [
                    {
                        "text": "Any two single characters",
                        "correct": false
                    },
                    {
                        "text": "A user’s home directory",
                        "correct": true
                    },
                    {
                        "text": "Nothing; it has no special meaning",
                        "correct": false
                    },
                    {
                        "text": "The directory above the current working directory",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The cd command by itself will take you to what directory?",
                "answers": [
                    {
                        "text": "None; it is not a valid command",
                        "correct": false
                    },
                    {
                        "text": "The directory above the current working directory",
                        "correct": false
                    },
                    {
                        "text": "Your home directory",
                        "correct": true
                    },
                    {
                        "text": "The system root directory",
                        "correct": false
                    }
                ]
            },
            {
                "text": "What command will allow you to change your current working directory?",
                "answers": [
                    {
                        "text": "ls",
                        "correct": false
                    },
                    {
                        "text": "cd",
                        "correct": true
                    },
                    {
                        "text": "list",
                        "correct": false
                    },
                    {
                        "text": "chdir",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The first character in a long listing (ls -l) indicates:",
                "answers": [
                    {
                        "text": "The permissions",
                        "correct": false
                    },
                    {
                        "text": "The size",
                        "correct": false
                    },
                    {
                        "text": "If something is a file, directory, or symbolic link",
                        "correct": true
                    },
                    {
                        "text": "The owner",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following commands can be used to rename a file?",
                "answers": [
                    {
                        "text": "cp",
                        "correct": false
                    },
                    {
                        "text": "mv",
                        "correct": true
                    },
                    {
                        "text": "rm",
                        "correct": false
                    },
                    {
                        "text": "name",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The touch command can be used to:",
                "answers": [
                    {
                        "text": "Update the timestamp of existing files",
                        "correct": true
                    },
                    {
                        "text": "Change ownership of a file",
                        "correct": false
                    },
                    {
                        "text": "Create new files",
                        "correct": true
                    },
                    {
                        "text": "Change a file’s name",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which of the following are glob characters?",
                "answers": [
                    {
                        "text": "The dash character -",
                        "correct": false
                    },
                    {
                        "text": "The question mark ?",
                        "correct": true
                    },
                    {
                        "text": "The asterisk *",
                        "correct": true
                    },
                    {
                        "text": "The square brackets [ and ]",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "The main purpose of using glob characters is to be able to provide a list of filenames to a command.",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The asterisk character is used to represent zero or more of any character in a filename.",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Compression of a file works by:",
                "answers": [
                    {
                        "text": "Removing the high order bit from each byte",
                        "correct": false
                    },
                    {
                        "text": "Storing most of the data on removable media and just leaving a pointer",
                        "correct": false
                    },
                    {
                        "text": "Eliminating gaps within the file",
                        "correct": false
                    },
                    {
                        "text": "Consolidating multiple files into one",
                        "correct": false
                    },
                    {
                        "text": "Removing redundant information",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Lossy compression:",
                "answers": [
                    {
                        "text": "Sacrifices some quality",
                        "correct": true
                    },
                    {
                        "text": "Is often used with images",
                        "correct": true
                    },
                    {
                        "text": "Usually results better compression than lossless",
                        "correct": true
                    },
                    {
                        "text": "Is often used with documents",
                        "correct": false
                    },
                    {
                        "text": "Decompresses to an identical version as the original",
                        "correct": false
                    }
                ],
                "choose": 3
            },
            {
                "text": "Which of the following commands can be used to compress a file?",
                "answers": [
                    {
                        "text": "cat",
                        "correct": false
                    },
                    {
                        "text": "bzip2",
                        "correct": true
                    },
                    {
                        "text": "bunzip2",
                        "correct": false
                    },
                    {
                        "text": "zip",
                        "correct": true
                    },
                    {
                        "text": "gzip",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "The three main modes of tar are:",
                "answers": [
                    {
                        "text": "List",
                        "correct": true
                    },
                    {
                        "text": "Extract",
                        "correct": true
                    },
                    {
                        "text": "Copy",
                        "correct": false
                    },
                    {
                        "text": "Create",
                        "correct": true
                    },
                    {
                        "text": "Compress",
                        "correct": false
                    }
                ],
                "choose": 3
            },
            {
                "text": "In the command tar -czf foo.tar.gz bar, what is the purpose of the f flag?",
                "answers": [
                    {
                        "text": "Tells tar to print the name of each file as it is processed",
                        "correct": false
                    },
                    {
                        "text": "Tells tar to write to the file that follows the flag",
                        "correct": true
                    },
                    {
                        "text": "Specifies extra compression is to be used",
                        "correct": false
                    },
                    {
                        "text": "Tells tar to copy only files, and not directories",
                        "correct": false
                    },
                    {
                        "text": "Tells tar to read from the file that follows the flag",
                        "correct": false
                    }
                ]
            }
        ]
    },
    {
        "id": "test2",
        "title": "Test 2 – shell, procesy, používatelia, práva",
        "questions": [
            {
                "text": "A pipe allows you to...",
                "answers": [
                    {
                        "text": "...type multiple commands at one prompt.",
                        "correct": false
                    },
                    {
                        "text": "...send the output of a command to a file.",
                        "correct": false
                    },
                    {
                        "text": "...send the same input to multiple commands.",
                        "correct": false
                    },
                    {
                        "text": "...send the output of one command to another.",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Channel 2 is:",
                "answers": [
                    {
                        "text": "STDOUT",
                        "correct": false
                    },
                    {
                        "text": "STDERR",
                        "correct": true
                    },
                    {
                        "text": "STDIN",
                        "correct": false
                    },
                    {
                        "text": "STDALL",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The grep command...",
                "answers": [
                    {
                        "text": "...will display the line numbers in a file that contain a specified Regular Expression.",
                        "correct": false
                    },
                    {
                        "text": "...will display all the lines in a file containing the specified Regular Expression.",
                        "correct": true
                    },
                    {
                        "text": "...will display all the lines that begin with the specified Regular Expression.",
                        "correct": false
                    },
                    {
                        "text": "...is not case sensitive.",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following commands can be used to scroll through a text file?",
                "answers": [
                    {
                        "text": "more",
                        "correct": true
                    },
                    {
                        "text": "cat",
                        "correct": false
                    },
                    {
                        "text": "some",
                        "correct": false
                    },
                    {
                        "text": "less",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which command can be used to print line numbers?",
                "answers": [
                    {
                        "text": "num",
                        "correct": false
                    },
                    {
                        "text": "nl",
                        "correct": true
                    },
                    {
                        "text": "ln",
                        "correct": false
                    },
                    {
                        "text": "sort",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which are appropriate editors for writing shell scripts?",
                "answers": [
                    {
                        "text": "nano",
                        "correct": true
                    },
                    {
                        "text": "vi",
                        "correct": true
                    },
                    {
                        "text": "LibreOffice Writer",
                        "correct": false
                    },
                    {
                        "text": "Firefox",
                        "correct": false
                    },
                    {
                        "text": "/bin/bash",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which of the following are correct about for and while loops?",
                "answers": [
                    {
                        "text": "for loops require a variable over which to iterate",
                        "correct": false
                    },
                    {
                        "text": "for loops have a test each cycle to determine if it should run again",
                        "correct": false
                    },
                    {
                        "text": "while loops have a test each cycle to determine if it should run again",
                        "correct": true
                    },
                    {
                        "text": "for loops operate over a fixed list of items",
                        "correct": true
                    },
                    {
                        "text": "while loops operate over a fixed list of items",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "What is the correct way to assign the word “Hello” to a variable?",
                "answers": [
                    {
                        "text": "$A=\"Hello\"",
                        "correct": false
                    },
                    {
                        "text": "echo “Hello” > A",
                        "correct": false
                    },
                    {
                        "text": "A=\"Hello\"",
                        "correct": true
                    },
                    {
                        "text": "A = “Hello”",
                        "correct": false
                    },
                    {
                        "text": "echo $A “Hello”",
                        "correct": false
                    }
                ]
            },
            {
                "text": "What is the correct way to save the current directory to a variable?",
                "answers": [
                    {
                        "text": "pwd $A",
                        "correct": false
                    },
                    {
                        "text": "pwd | $A",
                        "correct": false
                    },
                    {
                        "text": "A=`pwd`",
                        "correct": true
                    },
                    {
                        "text": "A=pwd",
                        "correct": false
                    },
                    {
                        "text": "A=cwd",
                        "correct": false
                    }
                ]
            },
            {
                "text": "What is the meaning of $(( $i + 1 )) ?",
                "answers": [
                    {
                        "text": "This runs the command stored in variable i",
                        "correct": false
                    },
                    {
                        "text": "1 will be added to the i variable",
                        "correct": true
                    },
                    {
                        "text": "If i is 0, the loop will stop",
                        "correct": false
                    },
                    {
                        "text": "This will return the value of the first argument to the script",
                        "correct": false
                    },
                    {
                        "text": "This will return the value of the next argument to the script",
                        "correct": false
                    }
                ],
                "explanation": "Je to aritmetická expanzia v shelli."
            },
            {
                "text": "Which of the following are valid CPU types for Intel-based platforms?",
                "answers": [
                    {
                        "text": "24-bit",
                        "correct": false
                    },
                    {
                        "text": "32-bit",
                        "correct": true
                    },
                    {
                        "text": "48-bit",
                        "correct": false
                    },
                    {
                        "text": "64-bit",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "Choose all of the following statements that are true in regard to virtual RAM:",
                "answers": [
                    {
                        "text": "Virtual RAM is stored in the CPU",
                        "correct": false
                    },
                    {
                        "text": "Virtual RAM is also called swap space",
                        "correct": true
                    },
                    {
                        "text": "Virtual RAM is stored on a hard drive",
                        "correct": true
                    },
                    {
                        "text": "Virtual RAM is used when available physical RAM is low",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "A division of a hard drive may be referred to as a ________.",
                "answers": [
                    {
                        "text": "label",
                        "correct": false
                    },
                    {
                        "text": "portion",
                        "correct": false
                    },
                    {
                        "text": "partition",
                        "correct": true
                    },
                    {
                        "text": "block",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The fdisk command is a tool used for working with the MBR partitioned disks. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following commands will display CPU information?",
                "answers": [
                    {
                        "text": "arch",
                        "correct": true
                    },
                    {
                        "text": "showcpu",
                        "correct": false
                    },
                    {
                        "text": "lspic",
                        "correct": false
                    },
                    {
                        "text": "cpuinfo",
                        "correct": false
                    },
                    {
                        "text": "lscpu",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "The Process ID (PID) of the init process is:",
                "answers": [
                    {
                        "text": "varies",
                        "correct": false
                    },
                    {
                        "text": "1",
                        "correct": true
                    },
                    {
                        "text": "100",
                        "correct": false
                    },
                    {
                        "text": "0",
                        "correct": false
                    }
                ]
            },
            {
                "text": "What directory typically contains log files?",
                "answers": [
                    {
                        "text": "/usr/log",
                        "correct": false
                    },
                    {
                        "text": "/proc/loc",
                        "correct": false
                    },
                    {
                        "text": "/var/log",
                        "correct": true
                    },
                    {
                        "text": "/log",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The /var directory has files that change over time. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following commands will allow you to view all processes on the system?",
                "answers": [
                    {
                        "text": "ps -A",
                        "correct": true
                    },
                    {
                        "text": "ps aux",
                        "correct": true
                    },
                    {
                        "text": "ps elf",
                        "correct": false
                    },
                    {
                        "text": "ps",
                        "correct": false
                    },
                    {
                        "text": "ps -ef",
                        "correct": false
                    }
                ],
                "explanation": "V teste býva očakávané ps -A a ps aux. Pozor: v praxi aj ps -ef často zobrazí všetky procesy.",
                "choose": 2
            },
            {
                "text": "Which directory is the root of the filesystem?",
                "answers": [
                    {
                        "text": "/",
                        "correct": true
                    },
                    {
                        "text": "/root",
                        "correct": false
                    },
                    {
                        "text": "/sys",
                        "correct": false
                    },
                    {
                        "text": "/home",
                        "correct": false
                    },
                    {
                        "text": "/var",
                        "correct": false
                    }
                ]
            },
            {
                "text": "A service is...",
                "answers": [
                    {
                        "text": "...a file that contains configuration information.",
                        "correct": false
                    },
                    {
                        "text": "...a feature provided by one computer to another.",
                        "correct": true
                    },
                    {
                        "text": "...another name for a computer’s hostname.",
                        "correct": false
                    },
                    {
                        "text": "...like an IP address.",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Only servers have hostnames. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Which of the following are valid IPv4 addresses?",
                "answers": [
                    {
                        "text": "192.301.25.25",
                        "correct": false
                    },
                    {
                        "text": "192.105 10.2",
                        "correct": false
                    },
                    {
                        "text": "192.105.10.10",
                        "correct": true
                    },
                    {
                        "text": "10.33.55.77",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which of the following commands will allow you to log into a remote machine?",
                "answers": [
                    {
                        "text": "netstat",
                        "correct": false
                    },
                    {
                        "text": "dig",
                        "correct": false
                    },
                    {
                        "text": "route",
                        "correct": false
                    },
                    {
                        "text": "ssh",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Which files contain user account information?",
                "answers": [
                    {
                        "text": "/etc/shadow",
                        "correct": true
                    },
                    {
                        "text": "/etc/passwords",
                        "correct": false
                    },
                    {
                        "text": "/etc/group",
                        "correct": false
                    },
                    {
                        "text": "/etc/passwd",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which command will display the UID, GID and groups your current user belongs to?",
                "answers": [
                    {
                        "text": "id",
                        "correct": true
                    },
                    {
                        "text": "who",
                        "correct": false
                    },
                    {
                        "text": "about",
                        "correct": false
                    },
                    {
                        "text": "whoami",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Each user belongs to at least one group. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which command will display the users that are currently logged in to the system?",
                "answers": [
                    {
                        "text": "whoami",
                        "correct": false
                    },
                    {
                        "text": "about",
                        "correct": false
                    },
                    {
                        "text": "who",
                        "correct": true
                    },
                    {
                        "text": "id",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which command will display the groups that the root user belongs to?",
                "answers": [
                    {
                        "text": "groups -a",
                        "correct": false
                    },
                    {
                        "text": "all -t",
                        "correct": false
                    },
                    {
                        "text": "all",
                        "correct": false
                    },
                    {
                        "text": "id root",
                        "correct": true
                    },
                    {
                        "text": "group -r",
                        "correct": false
                    }
                ]
            },
            {
                "text": "UIDs 1-499 are usually reserved for what kind of users?",
                "answers": [
                    {
                        "text": "Are not used for user accounts, but for group accounts",
                        "correct": false
                    },
                    {
                        "text": "System accounts, such as server processes",
                        "correct": true
                    },
                    {
                        "text": "Log-in (human) users",
                        "correct": false
                    },
                    {
                        "text": "Remote log-in accounts",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following options for the useradd command allows root to specify the UID to be associated with the account?",
                "answers": [
                    {
                        "text": "-g",
                        "correct": false
                    },
                    {
                        "text": "-M",
                        "correct": false
                    },
                    {
                        "text": "-u",
                        "correct": true
                    },
                    {
                        "text": "-G",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which command can be used to determine a user’s most recent log in?",
                "answers": [
                    {
                        "text": "shell",
                        "correct": false
                    },
                    {
                        "text": "login",
                        "correct": false
                    },
                    {
                        "text": "last",
                        "correct": true
                    },
                    {
                        "text": "history",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following files contains encrypted user password information?",
                "answers": [
                    {
                        "text": "/etc/passwd",
                        "correct": false
                    },
                    {
                        "text": "/etc/usr",
                        "correct": false
                    },
                    {
                        "text": "/etc/group",
                        "correct": false
                    },
                    {
                        "text": "/etc/shadow",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Which of the following options for the useradd command allows you to use a different primary group then the default?",
                "answers": [
                    {
                        "text": "-G",
                        "correct": false
                    },
                    {
                        "text": "-g",
                        "correct": true
                    },
                    {
                        "text": "-u",
                        "correct": false
                    },
                    {
                        "text": "-U",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following commands can be used to modify a user?",
                "answers": [
                    {
                        "text": "useradd",
                        "correct": false
                    },
                    {
                        "text": "moduser",
                        "correct": false
                    },
                    {
                        "text": "adduser",
                        "correct": false
                    },
                    {
                        "text": "usermod",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Which of the following are methods for setting permissions using the chmod command?",
                "answers": [
                    {
                        "text": "primary",
                        "correct": false
                    },
                    {
                        "text": "symbolic",
                        "correct": true
                    },
                    {
                        "text": "letter",
                        "correct": false
                    },
                    {
                        "text": "octal",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "The chown command can be used to change the owner and group of a file. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The chmod command can be used on a file by:",
                "answers": [
                    {
                        "text": "The file owner",
                        "correct": false
                    },
                    {
                        "text": "A user that belongs to the file’s current group",
                        "correct": false
                    },
                    {
                        "text": "The file owner and root",
                        "correct": true
                    },
                    {
                        "text": "Only root",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The execute permission is never set on files by default. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The sticky bit permission...",
                "answers": [
                    {
                        "text": "...changes the group ownership existing files in a directory.",
                        "correct": false
                    },
                    {
                        "text": "...prevents others from removing files they don’t own from a common directory.",
                        "correct": true
                    },
                    {
                        "text": "...prevents others from overwriting files they don’t own in common directories.",
                        "correct": false
                    },
                    {
                        "text": "...sets the group ownership of any new file created in a directory.",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The setuid permission...",
                "answers": [
                    {
                        "text": "...reports the output of a script to the owner.",
                        "correct": false
                    },
                    {
                        "text": "...allows a command to be run as the file owner.",
                        "correct": true
                    },
                    {
                        "text": "...prevents the owner of a file from being changed.",
                        "correct": false
                    },
                    {
                        "text": "...allows files in a directory to be manipulated as by the directory owner.",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The setgid permission...",
                "answers": [
                    {
                        "text": "...allows a command to be run as the group owner of the file.",
                        "correct": true
                    },
                    {
                        "text": "...prevents the group owner of a file from being changed.",
                        "correct": false
                    },
                    {
                        "text": "...allows files created in a directory to be owned by the group that owns the directory.",
                        "correct": true
                    },
                    {
                        "text": "...can only be set on files.",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "Which of the following ls commands, when executed, will only show information about the directory itself?",
                "answers": [
                    {
                        "text": "ls -h",
                        "correct": false
                    },
                    {
                        "text": "ls -d",
                        "correct": true
                    },
                    {
                        "text": "ls -ld",
                        "correct": true
                    },
                    {
                        "text": "ld -a",
                        "correct": false
                    }
                ],
                "choose": 2
            }
        ]
    },
    {
        "id": "test3",
        "title": "Test 3 – Linux/OS, open source, dokumentácia",
        "questions": [
            {
                "text": "Embedded Systems means:",
                "answers": [
                    {
                        "text": "Businesses cannot charge anything for the software, only the hardware",
                        "correct": false
                    },
                    {
                        "text": "Systems designed to do a specific task on hardware optimized for only that purpose",
                        "correct": true
                    },
                    {
                        "text": "Users must support the systems themselves",
                        "correct": false
                    },
                    {
                        "text": "You can view the software’s source code",
                        "correct": false
                    },
                    {
                        "text": "Companies must share their changes",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Linux originally only ran on:",
                "answers": [
                    {
                        "text": "Specialized processor chips",
                        "correct": false
                    },
                    {
                        "text": "Raspberry Pi computers",
                        "correct": false
                    },
                    {
                        "text": "Xerox copy machines",
                        "correct": false
                    },
                    {
                        "text": "Intel 386 PCs",
                        "correct": true
                    },
                    {
                        "text": "Macintosh",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Bundling utilities, management tools, and application software with a Linux kernel is called a:",
                "answers": [
                    {
                        "text": "A text editor",
                        "correct": false
                    },
                    {
                        "text": "A type of hardware",
                        "correct": false
                    },
                    {
                        "text": "A distribution of Linux",
                        "correct": true
                    },
                    {
                        "text": "A trademark",
                        "correct": false
                    }
                ]
            },
            {
                "text": "A software release cycle describes:",
                "answers": [
                    {
                        "text": "How often the software’s memory is released back to the operating system",
                        "correct": false
                    },
                    {
                        "text": "How often the computer must be rebooted",
                        "correct": false
                    },
                    {
                        "text": "How often upgrades come out for software",
                        "correct": true
                    },
                    {
                        "text": "How often security fixes are implemented",
                        "correct": false
                    },
                    {
                        "text": "How often the computer must be upgraded to support new software",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Apple’s OS X is:",
                "answers": [
                    {
                        "text": "Tightly integrated with Apple hardware",
                        "correct": true
                    },
                    {
                        "text": "A fully certified UNIX distribution",
                        "correct": true
                    },
                    {
                        "text": "Primarily used to manage network services",
                        "correct": false
                    },
                    {
                        "text": "Able to natively run Windows binaries",
                        "correct": false
                    },
                    {
                        "text": "Derived from Linux",
                        "correct": false
                    },
                    {
                        "text": "Partially based on code from the FreeBSD project",
                        "correct": true
                    }
                ],
                "choose": 3
            },
            {
                "text": "Microsoft Windows:",
                "answers": [
                    {
                        "text": "Offers both desktop and server products",
                        "correct": true
                    },
                    {
                        "text": "Has a short maintenance cycle",
                        "correct": false
                    },
                    {
                        "text": "Has a Linux compatibility mode",
                        "correct": false
                    },
                    {
                        "text": "Is generally backwards compatible with previous versions",
                        "correct": true
                    },
                    {
                        "text": "Has a scripting environment called PowerShell",
                        "correct": true
                    },
                    {
                        "text": "Has a new desktop version every year.",
                        "correct": false
                    }
                ],
                "choose": 3
            },
            {
                "text": "An interpreted programming language:",
                "answers": [
                    {
                        "text": "Takes fewer resources to run than a compiled language",
                        "correct": false
                    },
                    {
                        "text": "Requires a compilation step but no linking step",
                        "correct": false
                    },
                    {
                        "text": "Tends to offer more features than compiled languages",
                        "correct": true
                    },
                    {
                        "text": "Is converted into machine specific instructions as the program runs",
                        "correct": true
                    },
                    {
                        "text": "Requires a linking step but no compilation step",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "The two main families of Linux shells are:",
                "answers": [
                    {
                        "text": "Emacs",
                        "correct": false
                    },
                    {
                        "text": "Korn shell",
                        "correct": false
                    },
                    {
                        "text": "Bourne Shell",
                        "correct": true
                    },
                    {
                        "text": "C Shell",
                        "correct": true
                    },
                    {
                        "text": "Python Shell",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "In virtualization, what are the host and guest?",
                "answers": [
                    {
                        "text": "The guest is the machine that runs the virtual machines",
                        "correct": false
                    },
                    {
                        "text": "The terms can be used interchangeably",
                        "correct": false
                    },
                    {
                        "text": "The host is the machine that runs the virtual machines",
                        "correct": true
                    },
                    {
                        "text": "A guest is a virtual machine",
                        "correct": true
                    },
                    {
                        "text": "A host is a virtual machine",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "Cloud computing is:",
                "answers": [
                    {
                        "text": "Is made possible by faster internet speeds",
                        "correct": false
                    },
                    {
                        "text": "Is useful for both business and home users",
                        "correct": false
                    },
                    {
                        "text": "All are correct",
                        "correct": true
                    },
                    {
                        "text": "Requires fewer resources because systems are shared among many users",
                        "correct": false
                    },
                    {
                        "text": "Allows users in different geographical regions to work together in real time",
                        "correct": false
                    }
                ]
            },
            {
                "text": "Which of the following are properties of a strong password?",
                "answers": [
                    {
                        "text": "Includes symbols",
                        "correct": true
                    },
                    {
                        "text": "At least 10 characters long",
                        "correct": true
                    },
                    {
                        "text": "A mix of upper and lower case",
                        "correct": true
                    },
                    {
                        "text": "Based on easy to remember items like birthdays",
                        "correct": false
                    },
                    {
                        "text": "Long so that it can be reused on multiple sites",
                        "correct": false
                    }
                ],
                "choose": 3
            },
            {
                "text": "A license where you don’t have access to the source code is called:",
                "answers": [
                    {
                        "text": "Closed source",
                        "correct": true
                    },
                    {
                        "text": "Sourceless",
                        "correct": false
                    },
                    {
                        "text": "Impaired source",
                        "correct": false
                    },
                    {
                        "text": "Open source",
                        "correct": false
                    }
                ]
            },
            {
                "text": "A copyleft provision in a software license means:",
                "answers": [
                    {
                        "text": "You must provide support for your modifications",
                        "correct": false
                    },
                    {
                        "text": "You must provide free copies of the software if you use it",
                        "correct": false
                    },
                    {
                        "text": "You may not link against third party closed source software",
                        "correct": false
                    },
                    {
                        "text": "You give up your copyright to the software",
                        "correct": false
                    },
                    {
                        "text": "If you redistribute the software, you must distribute the source to any changes you make",
                        "correct": true
                    }
                ]
            },
            {
                "text": "The Free Software Foundation believes that:",
                "answers": [
                    {
                        "text": "Software should be free to modify",
                        "correct": true
                    },
                    {
                        "text": "Software should be free to share",
                        "correct": true
                    },
                    {
                        "text": "No money should ever change hands",
                        "correct": false
                    },
                    {
                        "text": "People should write software with no expectation of making money",
                        "correct": false
                    },
                    {
                        "text": "Software should not have copyright",
                        "correct": false
                    }
                ],
                "choose": 2
            },
            {
                "text": "What does it mean when a work is placed in the public domain?",
                "answers": [
                    {
                        "text": "The author has relinquished the copyright on the work",
                        "correct": true
                    },
                    {
                        "text": "The author has died",
                        "correct": false
                    },
                    {
                        "text": "You must redistribute changes to the software",
                        "correct": false
                    },
                    {
                        "text": "You may not use the work for commercial purposes",
                        "correct": false
                    },
                    {
                        "text": "The work was done by a government agency",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The semicolon (;) can be used to separate multiple commands to be executed in order. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ]
            },
            {
                "text": "To be able to output messages to the screen, use the ________ command:",
                "answers": [
                    {
                        "text": "type",
                        "correct": false
                    },
                    {
                        "text": "print",
                        "correct": false
                    },
                    {
                        "text": "display",
                        "correct": false
                    },
                    {
                        "text": "echo",
                        "correct": true
                    }
                ]
            },
            {
                "text": "The ________ command will print a list of the commands that you’ve previously executed.",
                "answers": [
                    {
                        "text": "history",
                        "correct": true
                    },
                    {
                        "text": "exec",
                        "correct": false
                    },
                    {
                        "text": "eval",
                        "correct": false
                    },
                    {
                        "text": "list",
                        "correct": false
                    }
                ]
            },
            {
                "text": "HOME is an example of ________.",
                "answers": [
                    {
                        "text": "An internal command",
                        "correct": false
                    },
                    {
                        "text": "An alias",
                        "correct": false
                    },
                    {
                        "text": "A path variable",
                        "correct": false
                    },
                    {
                        "text": "A local variable",
                        "correct": false
                    },
                    {
                        "text": "An environment variable",
                        "correct": true
                    }
                ]
            },
            {
                "text": "The directory where additional documentation for software packages most likely can be found is:",
                "answers": [
                    {
                        "text": "/usr/share/doc",
                        "correct": true
                    },
                    {
                        "text": "/var/share/doc",
                        "correct": false
                    },
                    {
                        "text": "/var/lib/doc",
                        "correct": false
                    },
                    {
                        "text": "/usr/software/doc",
                        "correct": false
                    }
                ]
            },
            {
                "text": "To start searching a man page, the first key you press is:",
                "answers": [
                    {
                        "text": "s",
                        "correct": false
                    },
                    {
                        "text": "!",
                        "correct": false
                    },
                    {
                        "text": "/",
                        "correct": true
                    },
                    {
                        "text": "f",
                        "correct": false
                    }
                ]
            },
            {
                "text": "To get help on using the info command, execute:",
                "answers": [
                    {
                        "text": "help info",
                        "correct": false
                    },
                    {
                        "text": "man info",
                        "correct": true
                    },
                    {
                        "text": "info -q",
                        "correct": false
                    },
                    {
                        "text": "info info",
                        "correct": true
                    }
                ],
                "choose": 2
            },
            {
                "text": "The ________ command can be used to find any file, not just commands or man pages.",
                "answers": [
                    {
                        "text": "whatis",
                        "correct": false
                    },
                    {
                        "text": "whereis",
                        "correct": false
                    },
                    {
                        "text": "apropos",
                        "correct": false
                    },
                    {
                        "text": "locate",
                        "correct": true
                    }
                ]
            },
            {
                "text": "Hidden files are files that begin with what character?",
                "answers": [
                    {
                        "text": "A dash (-)",
                        "correct": false
                    },
                    {
                        "text": "A plus (+)",
                        "correct": false
                    },
                    {
                        "text": "A period (.)",
                        "correct": true
                    },
                    {
                        "text": "An asterisk (*)",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The top-level directory on a Linux system is represented as:",
                "answers": [
                    {
                        "text": "C:",
                        "correct": false
                    },
                    {
                        "text": "/home",
                        "correct": false
                    },
                    {
                        "text": "/",
                        "correct": true
                    },
                    {
                        "text": "/root",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The ls command without options or arguments...",
                "answers": [
                    {
                        "text": "...lists the contents of the current directory.",
                        "correct": true
                    },
                    {
                        "text": "...prompts for a directory to list.",
                        "correct": false
                    },
                    {
                        "text": "...generates an error as this command requires arguments.",
                        "correct": false
                    },
                    {
                        "text": "...lists the contents of a user’s home directory.",
                        "correct": false
                    }
                ]
            },
            {
                "text": "The command ls -S will sort files:",
                "answers": [
                    {
                        "text": "By size, smallest to largest",
                        "correct": false
                    },
                    {
                        "text": "By size, largest to smallest",
                        "correct": true
                    },
                    {
                        "text": "By number of symlinks, largest to smallest",
                        "correct": false
                    },
                    {
                        "text": "By modification date, newest to oldest",
                        "correct": false
                    }
                ],
                "explanation": "ls -S triedi podľa veľkosti súboru od najväčšieho po najmenší."
            },
            {
                "text": "When using the cp command, you must provide both a source and a destination. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ],
                "explanation": "cp potrebuje zdroj, ktorý kopíruješ, a cieľ, kam ho kopíruješ."
            },
            {
                "text": "Which option can be used with the rm command to prompt before deleting?",
                "answers": [
                    {
                        "text": "l",
                        "correct": false
                    },
                    {
                        "text": "-i",
                        "correct": true
                    },
                    {
                        "text": "A",
                        "correct": false
                    },
                    {
                        "text": "-P",
                        "correct": false
                    }
                ],
                "explanation": "rm -i sa pred vymazaním opýta na potvrdenie."
            },
            {
                "text": "Which command would list files that do not begin with a T or a W?",
                "answers": [
                    {
                        "text": "echo /etc/*[TW]!",
                        "correct": false
                    },
                    {
                        "text": "echo /etc/[!TW]*",
                        "correct": true
                    },
                    {
                        "text": "echo /etc/!TW",
                        "correct": false
                    },
                    {
                        "text": "echo /etc/[*TW]!",
                        "correct": false
                    }
                ],
                "explanation": "V glob vzore [!TW] znamená znak, ktorý nie je T ani W; hviezdička potom doplní zvyšok názvu."
            },
            {
                "text": "In general, for which of the following would you want to use lossless compression?",
                "answers": [
                    {
                        "text": "An mp3 audio file",
                        "correct": false
                    },
                    {
                        "text": "A movie",
                        "correct": false
                    },
                    {
                        "text": "A JPEG image",
                        "correct": false
                    },
                    {
                        "text": "A log file",
                        "correct": true
                    },
                    {
                        "text": "An encrypted email",
                        "correct": false
                    }
                ],
                "explanation": "Textové/log súbory treba vedieť obnoviť presne, preto sa používa bezstratová kompresia."
            },
            {
                "text": "You type gzip myfile.tar. What happens?",
                "choose": 2,
                "answers": [
                    {
                        "text": "myfile.tar is removed",
                        "correct": true
                    },
                    {
                        "text": "An error; you forgot to pass the name of the output file",
                        "correct": false
                    },
                    {
                        "text": "myfile.tar is unarchived into the current directory",
                        "correct": false
                    },
                    {
                        "text": "myfile.tar.gz holds a compressed version of myfile.tar",
                        "correct": true
                    },
                    {
                        "text": "An error; you forgot to specify the file with -f",
                        "correct": false
                    }
                ],
                "explanation": "gzip vytvorí myfile.tar.gz a pôvodný myfile.tar štandardne odstráni."
            },
            {
                "text": "Which command will show what is inside the compressed tarball with a name of foo.tar.gz?",
                "answers": [
                    {
                        "text": "tar -tf foo.tar.gz",
                        "correct": false
                    },
                    {
                        "text": "tar -lf foo.tar.gz",
                        "correct": false
                    },
                    {
                        "text": "tar -tzf foo.tar.gz",
                        "correct": true
                    },
                    {
                        "text": "tar -jtf foo.tar.gz",
                        "correct": false
                    },
                    {
                        "text": "tar -xf foo.tar.gz",
                        "correct": false
                    }
                ],
                "explanation": "tar -t listuje obsah, -z pracuje s gzip kompresiou a -f určí súbor archívu."
            },
            {
                "text": "By default, the zip command replaces uncompressed files with compressed files. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "zip štandardne vytvorí .zip archív a pôvodné súbory nechá."
            },
            {
                "text": "Error messages generated by commands are sent where by default?",
                "answers": [
                    {
                        "text": "STDOUT",
                        "correct": false
                    },
                    {
                        "text": "Log files",
                        "correct": false
                    },
                    {
                        "text": "STDERR",
                        "correct": true
                    },
                    {
                        "text": "STDIN",
                        "correct": false
                    }
                ],
                "explanation": "Chybové hlásenia idú štandardne na STDERR, čiže file descriptor 2."
            },
            {
                "text": "Which of the following commands will display only lines that begin with test?",
                "answers": [
                    {
                        "text": "grep $test* file.txt",
                        "correct": false
                    },
                    {
                        "text": "grep ^test file.txt",
                        "correct": true
                    },
                    {
                        "text": "grep &test file.txt",
                        "correct": false
                    },
                    {
                        "text": "grep *test file.txt",
                        "correct": false
                    }
                ],
                "explanation": "V regulárnom výraze ^ znamená začiatok riadku."
            },
            {
                "text": "Which of the following commands will display lines that contain either start or end?",
                "answers": [
                    {
                        "text": "egrep start end file.txt",
                        "correct": false
                    },
                    {
                        "text": "egrep (start|end) file.txt",
                        "correct": false
                    },
                    {
                        "text": "egrep start&end file.txt",
                        "correct": false
                    },
                    {
                        "text": "egrep 'start|end' file.txt",
                        "correct": true
                    }
                ],
                "explanation": "V egrep rozšírenom regulárnom výraze znak | znamená OR. Úvodzovky chránia výraz pred shellom."
            },
            {
                "text": "A file begins with #!/bin/csh. This means:",
                "answers": [
                    {
                        "text": "Nothing, this is a comment",
                        "correct": false
                    },
                    {
                        "text": "This is a Perl script",
                        "correct": false
                    },
                    {
                        "text": "Running the script will invoke /bin/csh to interpret the rest of the file",
                        "correct": true
                    },
                    {
                        "text": "The operator should not be using /bin/csh",
                        "correct": false
                    },
                    {
                        "text": "C shell compatibility mode is enabled",
                        "correct": false
                    }
                ],
                "explanation": "Shebang #! určuje interpreter, ktorý sa použije pri spustení skriptu."
            },
            {
                "text": "Most of nano’s commands take the form of:",
                "answers": [
                    {
                        "text": "Alt and another character",
                        "correct": false
                    },
                    {
                        "text": "Control and another character",
                        "correct": true
                    },
                    {
                        "text": "The F1 through F12 function keys",
                        "correct": false
                    },
                    {
                        "text": "Mouse clicks",
                        "correct": false
                    },
                    {
                        "text": "Escape followed by another character",
                        "correct": false
                    }
                ],
                "explanation": "V nano sa veľa príkazov zadáva cez Ctrl + znak, napr. Ctrl+O uložiť, Ctrl+X ukončiť."
            },
            {
                "text": "The if command looks for what exit code to consider a condition to be true?",
                "answers": [
                    {
                        "text": "0",
                        "correct": true
                    },
                    {
                        "text": "10",
                        "correct": false
                    },
                    {
                        "text": "255",
                        "correct": false
                    },
                    {
                        "text": "2",
                        "correct": false
                    },
                    {
                        "text": "1",
                        "correct": false
                    }
                ],
                "explanation": "V shelli exit code 0 znamená úspech/true, nenulová hodnota znamená chybu/false."
            },
            {
                "text": "The number of users logged in is in a variable called USERS. How would you test to see if there are 5 users logged in?",
                "answers": [
                    {
                        "text": "test -f USERS=5",
                        "correct": false
                    },
                    {
                        "text": "test $USERS -eq 5",
                        "correct": true
                    },
                    {
                        "text": "test $USERS = 5",
                        "correct": false
                    },
                    {
                        "text": "test $USERS -a 5",
                        "correct": false
                    },
                    {
                        "text": "test $USERS,5",
                        "correct": false
                    }
                ],
                "explanation": "Pre číselné porovnanie v test sa používa -eq."
            },
            {
                "text": "Which of the following are valid partitioning types?",
                "choose": 2,
                "answers": [
                    {
                        "text": "GPT",
                        "correct": true
                    },
                    {
                        "text": "PC",
                        "correct": false
                    },
                    {
                        "text": "MBR",
                        "correct": true
                    },
                    {
                        "text": "BIOS",
                        "correct": false
                    }
                ],
                "explanation": "Bežné schémy tabuľky partícií sú MBR a GPT."
            },
            {
                "text": "Software that allows hardware devices to communicate with the installed operating system is called?",
                "answers": [
                    {
                        "text": "Packages",
                        "correct": false
                    },
                    {
                        "text": "Drivers",
                        "correct": true
                    },
                    {
                        "text": "Instructions",
                        "correct": false
                    },
                    {
                        "text": "Programs",
                        "correct": false
                    }
                ],
                "explanation": "Ovládače/drivers sprostredkujú komunikáciu medzi hardvérom a OS."
            },
            {
                "text": "Which of the following commands will check hard disk GPT partitions?",
                "choose": 3,
                "answers": [
                    {
                        "text": "gdisk",
                        "correct": true
                    },
                    {
                        "text": "sfdisk",
                        "correct": false
                    },
                    {
                        "text": "gfdisk",
                        "correct": false
                    },
                    {
                        "text": "sgdisk",
                        "correct": true
                    },
                    {
                        "text": "cgdisk",
                        "correct": true
                    }
                ],
                "explanation": "gdisk, sgdisk a cgdisk sú nástroje pre GPT partície."
            },
            {
                "text": "The ps command shows only processes running in the current shell by default. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ],
                "explanation": "Bez volieb ps zvyčajne zobrazí procesy priradené k aktuálnemu terminálu/shellu."
            },
            {
                "text": "The free command outputs statistics about:",
                "answers": [
                    {
                        "text": "Disk usage",
                        "correct": false
                    },
                    {
                        "text": "Memory usage",
                        "correct": true
                    },
                    {
                        "text": "Software usage",
                        "correct": false
                    },
                    {
                        "text": "CPU usage",
                        "correct": false
                    }
                ],
                "explanation": "free ukazuje využitie RAM a swap pamäte."
            },
            {
                "text": "Which file contains the information passed to the kernel at boot time?",
                "answers": [
                    {
                        "text": "/proc/kernel",
                        "correct": false
                    },
                    {
                        "text": "/proc/args",
                        "correct": false
                    },
                    {
                        "text": "/proc/kopts",
                        "correct": false
                    },
                    {
                        "text": "/proc/cmdline",
                        "correct": true
                    }
                ],
                "explanation": "/proc/cmdline obsahuje parametre, s ktorými bol kernel spustený."
            },
            {
                "text": "To make changes permanent for kernel parameter files found under /proc/sys, the following file can have entries added to it:",
                "answers": [
                    {
                        "text": "/etc/sysinfo.conf",
                        "correct": false
                    },
                    {
                        "text": "/etc/sysctl.conf",
                        "correct": true
                    },
                    {
                        "text": "/etc/proctl.conf",
                        "correct": false
                    },
                    {
                        "text": "/etc/procsys.conf",
                        "correct": false
                    }
                ],
                "explanation": "Trvalé sysctl nastavenia sa ukladajú napríklad do /etc/sysctl.conf."
            },
            {
                "text": "Which of the following commands will display the IP address on a Linux system?",
                "answers": [
                    {
                        "text": "dig",
                        "correct": false
                    },
                    {
                        "text": "ifconfig",
                        "correct": true
                    },
                    {
                        "text": "route",
                        "correct": false
                    },
                    {
                        "text": "ipconfig",
                        "correct": false
                    }
                ],
                "explanation": "V starších Linux systémoch ifconfig zobrazí sieťové rozhrania a IP adresy."
            },
            {
                "text": "The RSA key fingerprint allows the dig command to connect to remote systems. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "RSA fingerprint sa týka najmä SSH, nie dig."
            },
            {
                "text": "When issuing the service network restart command, which of the following occurs?",
                "answers": [
                    {
                        "text": "... the networking for the system is stopped and then started back up.",
                        "correct": false
                    },
                    {
                        "text": "... brings up all network interfaces, re-reads all related configuration files and then the networking for the system is restarted.",
                        "correct": false
                    },
                    {
                        "text": "... takes down all network interfaces, re-reads all related configuration files and then the networking for the system is restarted.",
                        "correct": true
                    }
                ],
                "explanation": "Reštart služby network zhodí rozhrania, načíta konfiguráciu a sieť opäť spustí."
            },
            {
                "text": "Which of the following commands can be used to display socket statistics, and supports all major packet and socket types?",
                "answers": [
                    {
                        "text": "route",
                        "correct": false
                    },
                    {
                        "text": "ss",
                        "correct": true
                    },
                    {
                        "text": "top",
                        "correct": false
                    },
                    {
                        "text": "ifconfig",
                        "correct": false
                    }
                ],
                "explanation": "ss zobrazuje štatistiky socketov a je moderná náhrada časti netstat funkcií."
            },
            {
                "text": "Which of the following commands will display the groups that the user bob belongs to?",
                "answers": [
                    {
                        "text": "groups -a",
                        "correct": false
                    },
                    {
                        "text": "group bob",
                        "correct": false
                    },
                    {
                        "text": "all bb",
                        "correct": false
                    },
                    {
                        "text": "id bob",
                        "correct": true
                    }
                ],
                "explanation": "id bob vypíše UID, GID a skupiny používateľa bob."
            },
            {
                "text": "Traditional UNIX systems allowed users to belong to how many groups?",
                "answers": [
                    {
                        "text": "256",
                        "correct": false
                    },
                    {
                        "text": "65,000",
                        "correct": false
                    },
                    {
                        "text": "1",
                        "correct": false
                    },
                    {
                        "text": "10,000",
                        "correct": false
                    },
                    {
                        "text": "16",
                        "correct": true
                    }
                ],
                "explanation": "Tradičný limit bol 16 skupín."
            },
            {
                "text": "A value of 0 in the “minimum” password aging field means the user cannot change their password. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "Minimum 0 znamená, že používateľ môže zmeniť heslo kedykoľvek, nie že ho zmeniť nemôže."
            },
            {
                "text": "Sudo privileges allow users to execute commands as another user. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": true
                    },
                    {
                        "text": "False",
                        "correct": false
                    }
                ],
                "explanation": "sudo umožňuje spúšťať príkazy s právami iného používateľa, často root."
            },
            {
                "text": "The first line of this command displays how long the system has been running since being rebooted.",
                "answers": [
                    {
                        "text": "getent",
                        "correct": false
                    },
                    {
                        "text": "id",
                        "correct": false
                    },
                    {
                        "text": "w",
                        "correct": true
                    },
                    {
                        "text": "su",
                        "correct": false
                    },
                    {
                        "text": "who",
                        "correct": false
                    }
                ],
                "explanation": "Príkaz w v prvom riadku ukazuje uptime systému."
            },
            {
                "text": "Which option for the usermod command can be used to specify a user’s group ID, either primary or secondary?",
                "choose": 2,
                "answers": [
                    {
                        "text": "-G",
                        "correct": true
                    },
                    {
                        "text": "-s",
                        "correct": false
                    },
                    {
                        "text": "-S",
                        "correct": false
                    },
                    {
                        "text": "-g",
                        "correct": true
                    }
                ],
                "explanation": "usermod -g nastavuje primárnu skupinu, -G nastavuje doplnkové skupiny."
            },
            {
                "text": "The groupmod command can be used to add users to a group. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "groupmod upravuje vlastnosti skupiny; používateľov do skupín pridáva napríklad usermod -aG alebo gpasswd."
            },
            {
                "text": "Which of the following files contains user IDs?",
                "answers": [
                    {
                        "text": "/etc/usr",
                        "correct": false
                    },
                    {
                        "text": "/etc/shadow",
                        "correct": false
                    },
                    {
                        "text": "/etc/group",
                        "correct": false
                    },
                    {
                        "text": "/etc/passwd",
                        "correct": true
                    }
                ],
                "explanation": "/etc/passwd obsahuje používateľské účty vrátane UID a GID."
            },
            {
                "text": "Which of the following commands, run as root, will prevent the user bob from logging in?",
                "answers": [
                    {
                        "text": "usermod -D bob",
                        "correct": false
                    },
                    {
                        "text": "usermod -d bob",
                        "correct": false
                    },
                    {
                        "text": "usermod -L bob",
                        "correct": true
                    },
                    {
                        "text": "usermod -l bob",
                        "correct": false
                    }
                ],
                "explanation": "usermod -L uzamkne používateľské heslo/účet pre prihlásenie heslom."
            },
            {
                "text": "What directory contains a user’s home directory?",
                "answers": [
                    {
                        "text": "/rootfs",
                        "correct": false
                    },
                    {
                        "text": "/",
                        "correct": false
                    },
                    {
                        "text": "/home",
                        "correct": true
                    },
                    {
                        "text": "/user",
                        "correct": false
                    }
                ],
                "explanation": "Domovské adresáre bežných používateľov sú typicky pod /home."
            },
            {
                "text": "GIDs under 500 (or 1000) are usually reserved for what kind of groups?",
                "answers": [
                    {
                        "text": "Administrators",
                        "correct": false
                    },
                    {
                        "text": "System use",
                        "correct": true
                    },
                    {
                        "text": "User private groups (UPG)",
                        "correct": false
                    },
                    {
                        "text": "Are not used for groups, but for user accounts",
                        "correct": false
                    }
                ],
                "explanation": "Nižšie GID hodnoty sú zvyčajne rezervované pre systémové skupiny."
            },
            {
                "text": "A user cannot delete a file if they do not own it. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "Mazanie závisí hlavne od práv k adresáru, nie iba od vlastníctva súboru. Sticky bit je výnimka v spoločných adresároch."
            },
            {
                "text": "The chown command permits changing group ownership done by root only. True or False?",
                "answers": [
                    {
                        "text": "True",
                        "correct": false
                    },
                    {
                        "text": "False",
                        "correct": true
                    }
                ],
                "explanation": "Zmenu skupiny možno robiť aj nástrojmi ako chgrp; podľa pravidiel systému ju nemusí robiť výhradne root."
            },
            {
                "text": "Which of the following commands will list hidden files as well as their ownership?",
                "answers": [
                    {
                        "text": "ls -l",
                        "correct": false
                    },
                    {
                        "text": "ls -z",
                        "correct": false
                    },
                    {
                        "text": "ls -a",
                        "correct": false
                    },
                    {
                        "text": "ls -la",
                        "correct": true
                    }
                ],
                "explanation": "-a zobrazí skryté súbory a -l dlhý výpis s vlastníctvom."
            },
            {
                "text": "Which of the following commands will set setuid for the /usr/bin/program?",
                "answers": [
                    {
                        "text": "chmod 1755 /usr/bin/program",
                        "correct": false
                    },
                    {
                        "text": "None of the above",
                        "correct": false
                    },
                    {
                        "text": "chmod 2755 /usr/bin/program",
                        "correct": false
                    },
                    {
                        "text": "chmod 4755 /usr/bin/program",
                        "correct": true
                    }
                ],
                "explanation": "Setuid bit má v oktálovom zápise hodnotu 4 na začiatku, teda 4755."
            },
            {
                "text": "Setting setgid on a directory...",
                "answers": [
                    {
                        "text": "... will set the group owner of all files created in the directory to the group owner of the directory.",
                        "correct": true
                    },
                    {
                        "text": "... will allow scripts in the directory to be executed as the group owner of the directory.",
                        "correct": false
                    },
                    {
                        "text": "... does nothing.",
                        "correct": false
                    },
                    {
                        "text": "... is not allowed by the system.",
                        "correct": false
                    }
                ],
                "explanation": "Setgid na adresári spôsobí, že nové súbory/adresáre dedia skupinu rodičovského adresára."
            }
        ]
    }
];
