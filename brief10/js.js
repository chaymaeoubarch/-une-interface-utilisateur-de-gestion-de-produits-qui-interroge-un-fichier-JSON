let table=document.getElementById('table');
// BRINGING JSON FILE
$(document).ready(function(){
  $.getJSON('file.json',
  (data)=>{console.log(data)})
})

// FETCHING DATA FROM JSON FILE INTO TABLE
$(document).ready(function(){
  $.getJSON("file.json", function (data) {
let table_data = '';
$.each(data,function(key, value){
  table_data += `<tr>
 <td><img src="${value.items}"></td>
 <td>${value.id}</td>
 <td>${value.name}</td>
 <td>${value.price}</td>
 <td>${value.category}</td>
 <td>${value.availability}</td>
 <td>${value.supplier.company}</td>
 <td>${value.supplier.address}</td>
 </tr>`;
});
$('#table').append(table_data);
});
});

// SEARCH INPUT
  $(document).ready(function(){
    $("#search-text-input").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#tb tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  function sortTable(column, type) {

    //Get and set order
    //Use -data to store wheater it will be sorted ascending or descending
    let order = $('.table thead tr>th:eq(' + column + ')').data('order');
    order = order === 'ASC' ? 'DESC' : 'ASC';
    $('.table thead tr>th:eq(' + column + ')').data('order', order);

    //Sort the table
    $('#tb tr').sort(function(a, b) {
    //      comparing A and B cuz we are sorting rows 
    //      A and B are <tr>

      //Find the <td> using the column number and get the text value.
      //Now, the a and b are the text of the <td>
      a = $(a).find('td:eq(' + column + ')').text();
      b = $(b).find('td:eq(' + column + ')').text();

      switch (type) {
        case 'text':
          //Proper way to compare text in js is using localeCompare
          //If order is ascending you can - a.localeCompare(b)
          //If order is descending you can - b.localeCompare(a);
          return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
          break;
        case 'number':
          //You can use deduct to compare if number.
          //If order is ascending you can -> a - b. 
          //Which means if a is bigger. It will return a positive number. b will be positioned first
          //If b is bigger, it will return a negative number. a will be positioned first
          return order === 'ASC' ? a - b : b - a;
          break;

      }

  }).appendTo('.table tbody');
  }
  $('#id').click(function() {
    sortTable(1, 'number');
  });
  $('#name').click(function() {
    sortTable(2, 'text');
  });
  $('#price').click(function() {
    sortTable(3, 'text');
  });
  $('#availability').click(function() {
    sortTable(5, 'text');
  });
