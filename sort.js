/* source: https://stackoverflow.com/questions/67913593/how-to-sort-an-html-table */

function addlistener()
{
const table = document.getElementById("test"),
      th = test.querySelectorAll("th"),
      sortDefault = 0, //default sorted column number
      orderDefault = 0; //default order: 0 = ascending, 1 = descending

table.dataset.sort = sortDefault;
table.dataset.order = orderDefault;

/* add click listeners on table headers */
for(let i = 0; i < th.length; i++)
{
  th[i].addEventListener("click", e =>
  {
    /* if this column was sorted, change it's order */
    if (+table.dataset.sort == e.target.cellIndex)
      table.dataset.order = +table.dataset.order ? 0 : 1;

    /* tell table which column is currently sorted */
    table.dataset.sort = e.target.cellIndex;
    //sortColumn(i);
    sortTable(i);
  });
}
}

function sortColumn(n)
{
  document.getElementById("log").innerHTML ='sort column ' + table.dataset.sort;

  const table = document.getElementById("test");
  table.dataset.sort = n;

  const rows = Array.from(table.children);
  rows.splice(0, 1); //remove header from the list
  rows.sort((a, b) => 
  {
    a = a.children[table.dataset.sort].textContent;
    b = b.children[table.dataset.sort].textContent;

    a = a.replace(/\W/g, ""); //remove non alphanumerical characters
    b = b.replace(/\W/g, ""); //remove non alphanumerical characters

    return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
  });

  if (+table.dataset.order)
    rows.reverse();

  for(let i = 0; i < rows.length; i++)
  {
    table.appendChild(rows[i]);
  }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("test");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "desc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML.toLowerCase()) > Number(y.innerHTML.toLowerCase())) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML.toLowerCase()) < Number(y.innerHTML.toLowerCase())) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
