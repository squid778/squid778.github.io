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
document.getElementById("log").innerHTML = 'sort on ' + i;
    sortColumn(i);
  });
}
}

function sortColumn(n)
{
document.getElementById("log").innerHTML ='sort column ' + table.dataset.sort;
table.dataset.sort = n;

  const rows = Array.from(table.children);
  rows.splice(0, 1); //remove header from the list
window.alert(rows);
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

 window.alert(rows);
  for(let i = 0; i < rows.length; i++)
  {
    table.appendChild(rows[i]);
  }
}

