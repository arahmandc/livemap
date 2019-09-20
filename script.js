  window.onload = function() {
    init()
  };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1EDXmzu9H6sd6Hn1Pf8Tvd9jLtr7HaHNWAdxOTsSylhM/pubhtml';

  function init() {
    Tabletop.init({
      key: public_spreadsheet_url,
      callback: showInfo,
      simpleSheet: true
    })
  }

  function showInfo(data, tabletop) {
    var tr;
    for (var i = 0; i < data.length; i++) {
      tr = $('<tr/>');
      tr.append("<td>" + data[i].location_name + "</td>");
      tr.append("<td>" + data[i].category + "</td>");
      tr.append("<td>" + data[i].level + "</td>");
      tr.append("<td>" + data[i].lat + "</td>");
      tr.append("<td>" + data[i].long + "</td>");
      $('table').append(tr);
    }
    console.log(data);
  }