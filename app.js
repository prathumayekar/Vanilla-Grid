const gridStore = {
    data: [
        {
            // Each object represents a record in the grid.
            id: 2,
            data: {
                name: "Anuj",
                age: "22",
                gender: "Male",
                location: "Malad"
            }
        },
        {
            // Each object represents a record in the grid.
            id: 3,
            data: {
                name: "Taj",
                age: "21",
                gender: "Male",
                location: "Vasai"
            }
        },
        {
            // Each object represents a record in the grid.
            id: 4,
            data: {
                name: "Lisa",
                age: "25",
                gender: "Female",
                location: "Mulund"
            }
        },
        {
            // Each object represents a record in the grid.
            id: 1,
            data: {
                name: "Prathamesh",
                age: "22",
                gender: "Male",
                location: "Thane"
            }
        },
    ],
    getData: function() {
        return this.data;
    },
    setData: function(dataObj, append) {
        if(append) {
            this.data.push(dataObj);
            addRecord(dataObj);
        }
        else {
            // clearaing the existing data
            this.data.length = 0; 
            this.data.push(dataObj);
            clearRecords();
            addRecord(dataObj);
        }
    }
}

const gridConfig = {
    columns : [
        {
            name: "Age",
            dataIndex: "age",
        },
        {
            name: "Name",
            dataIndex: "name",
        },
        {
            name: "Gender",
            dataIndex: "gender"
        },
        {
            name: "Location",
            dataIndex: "location"
        }
    ]
}

function createGrid() {

    const gridContainer = document.querySelector('.gridContainer'),
    
    gridTable = document.createElement('table');
    gridTable.classList.add('table');

    const gridHeader = document.createElement('thead');
    gridHeader.classList.add('gridHeader');

    const gridBody = document.createElement('tbody');
    gridBody.classList.add('gridBody');

    const gridHeaderRow = document.createElement('tr');
    gridHeaderRow.classList.add('gridHeaderRow');

    gridContainer.appendChild(gridTable);
    gridTable.appendChild(gridHeader);
    gridTable.appendChild(gridBody);
    gridHeader.appendChild(gridHeaderRow);

    if(gridConfig.columns && gridConfig.columns.length > 0)
    {
        createGridHeader();
        createGridRecords();
    }

    const addRecordButton = document.createElement('button');
    addRecordButton.classList.add('gridOperationButton');
    const addRecordButtonText = document.createTextNode("Add Record");
    addRecordButton.appendChild(addRecordButtonText);
    gridContainer.appendChild(addRecordButton);

    addRecordButton.addEventListener('click', OnAddRecordButtonClick);
}

function createGridHeader() {
    const gridHeaderRow = document.querySelector('.gridHeaderRow');
    gridColumns = gridConfig.columns;
    gridColumns.forEach(column => {
            // creating header
            const headerCell = document.createElement('th');
            const headerCellText = document.createTextNode(`${column.name}`);
            headerCell.appendChild(headerCellText);
            gridHeaderRow.appendChild(headerCell);
            headerCell.addEventListener('click', sortGridColumn);
        });
}

function createGridRecords() {
    const gridRecords = gridStore.data;
    gridRecords.forEach(record => {
        addRecord(record);
    });
}

function addRecord(dataObj) {
    const gridColumns = gridConfig.columns;
    const gridBody = document.querySelector('.gridBody');
    const gridRecord = document.createElement('tr');
            
            gridColumns.forEach(column => {
                const bodyCell = document.createElement('td');
                const cellData = document.createTextNode(`${dataObj.data[column.dataIndex]}`);
                bodyCell.appendChild(cellData);
                gridRecord.appendChild(bodyCell);
            });

            gridBody.appendChild(gridRecord);
}

function clearRecords() {
    const gridBody = document.querySelector('.gridBody');
    gridBody.replaceChildren();
}

function OnAddRecordButtonClick(eopts) {
    const addRecordsContainer = document.createElement('div'),
    gridColumns = gridConfig.columns,
    gridContainer = document.querySelector('.gridContainer');
    addRecordsContainer.classList.add('addRecordsContainer');
    gridContainer.appendChild(addRecordsContainer);

    const addRecordForm = document.createElement('form');

    gridColumns.forEach(column => {
        const addRecordFormLabel = document.createElement('label'),
        addRecordFormLabelText = document.createTextNode(`${column.name}`);
        addRecordFormLabel.appendChild(addRecordFormLabelText);
        addRecordFormLabel.classList.add('formLabel');
        addRecordFormLabel.setAttribute("for", `${column.dataIndex}`);
        addRecordFormLabel.setAttribute("for", `${column.dataIndex}`);

        const addRecordFormInput = document.createElement('input');
        addRecordFormInput.setAttribute("id", `${column.dataIndex}`);

        addRecordForm.appendChild(addRecordFormLabel);
        addRecordForm.appendChild(addRecordFormInput);
        addRecordForm.classList.add('addRecordForm');
    });

    const addRecordFormSubmitBtn = document.createElement('button'),
    addRecordFormSubmitBtnText = document.createTextNode("Submit");
    addRecordFormSubmitBtn.appendChild(addRecordFormSubmitBtnText);
    addRecordFormSubmitBtn.setAttribute("type", "submit");
    addRecordFormSubmitBtn.classList.add('gridOperationButton');

    addRecordForm.appendChild(addRecordFormSubmitBtn);
    addRecordFormSubmitBtn.addEventListener('click', onAddRecordFormSubmitBtnClick);
    addRecordsContainer.appendChild(addRecordForm);
}

function onAddRecordFormSubmitBtnClick(e) {
    e.preventDefault();
    const addRecordForm = document.querySelector('.addRecordForm'),
    gridColumns = gridConfig.columns;

    let dataObj = {},
    recordData = {};

    dataObj.id = 21;

    gridColumns.forEach(column => {
        const addRecordFormInput = document.getElementById(`${column.dataIndex}`),
        addRecordFormInputValue = addRecordFormInput.value;
        recordData[column.dataIndex] = addRecordFormInputValue;
        console.log(addRecordFormInputValue);
    });

    dataObj.data = recordData;

    gridStore.setData(dataObj, true);

    addRecordForm.reset();
    
}

function sortGridColumn (e) {
    const columnName = e.target.innerText,
    gridColumns = gridConfig.columns;

    const filterKey = gridColumns.filter(column => {
        return column.name === columnName;
    })[0].dataIndex,

    gridStoreData =  gridStore.getData();
    gridStoreData.sort((a, b) => a.data[filterKey].localeCompare(b.data[filterKey]));
    gridStore.data = gridStoreData;
    clearRecords();
    createGridRecords();

}

createGrid();