(function(Scratch) {
    'use strict';

    class ModLoader {
        getInfo() {
            return {
                id: 'modloader',
                name: 'Mod Loader',
                blocks: [
                    {
                        opcode: 'loadMod',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'load mod [FILE]',
                        arguments: {
                            FILE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'exampleMod.js'
                            }
                        }
                    },
                    {
                        opcode: 'executeModFunction',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'execute mod function [FUNCTION]',
                        arguments: {
                            FUNCTION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'init'
                            }
                        }
                    },
                ]
            };
        }

        loadMod(args) {
            const file = args.FILE;
            const script = document.createElement('script');
            script.src = URL.createObjectURL(new Blob([file], { type: 'text/javascript' }));
            document.head.appendChild(script);
        }

        executeModFunction(args) {
            const func = args.FUNCTION;
            if (typeof window[func] === 'function') {
                window[func]();
            } else {
                console.error(`Function ${func} not found in any loaded mod.`);
            }
        }
    }

    Scratch.extensions.register(new ModLoader());
})(Scratch);
