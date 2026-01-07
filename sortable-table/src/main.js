import "./style.css";

const table = document.querySelector("table");

const tableHeaders = table.tHead.rows[0].cells;
const tableBody = table.tBodies[0];
const tableBodyRows = Array.from(tableBody.rows);

function sort(tableHeader, order) {
    if (order === "ascending") {
        tableBodyRows.sort((tableRow1, tableRow2) => {
            const tableRowText1 = tableRow1.cells[tableHeader.cellIndex].textContent;
            const tableRowText2 = tableRow2.cells[tableHeader.cellIndex].textContent;

            return tableRowText1.localeCompare(tableRowText2);
        });

        tableHeader.ariaSort = "ascending";
    } else if (order === "descending") {
        tableBodyRows.sort((tr1, tr2) => {
            const tr1Text = tr1.cells[tableHeader.cellIndex].textContent;
            const tr2Text = tr2.cells[tableHeader.cellIndex].textContent;

            return tr2Text.localeCompare(tr1Text);
        });

        tableHeader.ariaSort = "descending";
    }

    tableBody.append(...tableBodyRows);
}

// Initialize the table body
let activeTableHeader = tableHeaders[0];
sort(activeTableHeader, "ascending");

// Set the click event of the table headers
for (const tableHeader of tableHeaders) {
    tableHeader.addEventListener("click", () => {
        const tableHeaderAriaSort = tableHeader.ariaSort;

        if (tableHeaderAriaSort) {
            if (tableHeaderAriaSort === "ascending") {
                // ascending -> descending
                sort(tableHeader, "descending");
            } else if (tableHeaderAriaSort === "descending") {
                // descending -> ascending
                sort(tableHeader, "ascending");
            }
        } else {
            // Remove the existing aria-sort
            activeTableHeader.ariaSort = null;

            // descending
            sort(tableHeader, "descending");
        }

        activeTableHeader = tableHeader;
    });
}
