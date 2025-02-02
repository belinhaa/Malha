document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('color');
    const gridContainer = document.getElementById('grid-container');
    const paintTool = document.getElementById('paint');
    const eraseTool = document.getElementById('erase');
    const downloadButton = document.getElementById('download-btn');

    let currentTool = 'paint';

    function createGrid() {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', paint);
                gridContainer.appendChild(cell);
            }
        }
    }

    function paint(event) {
        if (currentTool === 'paint') {
            event.target.style.backgroundColor = colorPicker.value;
        } else if (currentTool === 'erase') {
            event.target.style.backgroundColor = '';
        }
    }

    paintTool.addEventListener('change', function() {
        currentTool = 'paint';
    });

    eraseTool.addEventListener('change', function() {
        currentTool = 'erase';
    });

    downloadButton.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        canvas.width = gridContainer.offsetWidth;
        canvas.height = gridContainer.offsetHeight;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff'; // Preenche o fundo branco
        context.fillRect(0, 0, canvas.width, canvas.height);
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const rect = cell.getBoundingClientRect();
            const color = cell.style.backgroundColor;
            if (color !== '') {
                context.fillStyle = color;
                context.fillRect(rect.left - gridContainer.offsetLeft, rect.top - gridContainer.offsetTop, rect.width, rect.height);
            }
        });
        const link = document.createElement('a');
        link.download = 'desenho.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    createGrid();
});
