
  function getMonthName(month) {
    var month = parseInt(month);
    var currentMonth = '';
    if (month === 1) {
      currentMonth = 'JAN';
    } else if (month === 2) {
      currentMonth = 'FEV';
    } else if (month === 3) {
      currentMonth = 'MAR';
    } else if (month === 4) {
      currentMonth = 'ABR';
    } else if (month === 5) {
      currentMonth = 'MAI';
    } else if (month === 6) {
      currentMonth = 'JUN';
    } else if (month === 7) {
      currentMonth = 'JUL';
    } else if (month === 8) {
      currentMonth = 'AGO';
    } else if (month === 9) {
      currentMonth = 'SET';
    } else if (month === 10) {
      currentMonth = 'OUT';
    } else if (month === 11) {
      currentMonth = 'NOV';
    } else if (month === 12) {
      currentMonth = 'DEZ';
    }
    return currentMonth;
  }

  function getFormattedDate(timestamp) {
    var date = timestamp.split(' ')[0].split('-', 3);
    date.shift();
    date.reverse();
    return date[0] + ' ' + getMonthName(date[1]);
  }

  function getFormattedHourAndMinutes(timestamp) {
    return timestamp.split(' ')[1].split(':', 2).join(':');
  }
  
  function capitalize(element) {
      return element.charAt(0).toUpperCase() + element.slice(1);
  }

  function extend(target, source) {
      target = target || {};
      for (var prop in source) {
          if (typeof source[prop] === 'object') {
              target[prop] = this.extend(target[prop], source[prop]);
          } else {
              target[prop] = source[prop];
          }
      }
      return target;
  }
