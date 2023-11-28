      // Helper 
        function normalizeRange(value, originalMin, originalMax, newMin, newMax) {
            var originalRange = originalMax - originalMin;
            var newRange = newMax - newMin;
            return (((value - originalMin) * newRange) / originalRange) + newMin;
        };
        // Button animation
        const GlowingButtonModule = {
            init: function (button) {
                const normalizedLocalCursorPos = { x: 0, y: 0 };
                const glowElements = button.querySelectorAll(".GlowingButton__glowWrap span");
                const leftGlow = button.querySelector(".GlowingButton__glowWrap.l span");
                const rightGlow = button.querySelector(".GlowingButton__glowWrap.r span");
                const rect = button.getBoundingClientRect(),
                    buttonWidth = button.clientWidth,
                    buttonHeight = button.clientHeight;

                button.addEventListener("mousemove", function (e) {
                    normalizedLocalCursorPos.x = normalizeRange(e.clientX - rect.left, 0, buttonWidth, -20, 20);
                    normalizedLocalCursorPos.y = normalizeRange(e.clientY - rect.top, 0, buttonHeight, -7, 7);
                    anime({
                        targets: glowElements,
                        translateX: `${normalizedLocalCursorPos.x}`,
                        translateY: `${normalizedLocalCursorPos.y}`
                    });
                });
                button.addEventListener("mouseleave", function () {
                    anime({
                        targets: glowElements,
                        translateX: 0,
                        translateY: 0
                    });
                })
            }
        }
        const buttons = document.querySelectorAll(".GlowingButton");
        buttons.forEach((button) => {
            new GlowingButtonModule.init(button);
        });