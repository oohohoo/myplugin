   var maxInputFields = 5; // Maximum number of input fields
        var wrapper = document.getElementById("inputFieldContainer");

        wrapper.addEventListener('click', function (e) {
            if (e.target.className === 'addButton') {
                e.preventDefault();
                if (wrapper.getElementsByClassName('inputContainer').length < maxInputFields) {
                    var div = document.createElement('div');
                    div.className = 'inputContainer';
                    div.innerHTML = '<input type="url" name="inputField[]" pattern=".*\.(js|css)$" title="URL must end with .js or .css"><button class="addButton">+</button><button class="removeButton">-</button>';
                    wrapper.appendChild(div);
                }
            } else if (e.target.className === 'removeButton') {
                e.preventDefault();
                e.target.parentNode.remove();
            }
        });