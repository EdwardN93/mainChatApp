$(document).ready(function () {
  let ip = location.host;
  console.log(ip);

  const addPost = $('.addPost');

  let link = `<a href="http://${ip}/book-post" class="direct"> Add new Location</a>`;

  $('.window-bookings').append(link);

  addPost.on('click', function (e) {
    e.preventDefault();

    let fname = $('.fname').val();
    let sname = $('.sname').val();
    let email = $('.email').val();
    let location = $('.location').val();
    let description = $('.description').val();
    let address = $('.address').val();
    let price = $('.price').val();
    let facilitiesArray = [];
    let wierdo = '';

    if ($('#balcony').prop('checked')) {
      facilitiesArray.push($('#balcony').val());
      wierdo += $('#balcony').val();
    }
    if ($('#breakfast').prop('checked')) {
      facilitiesArray.push($('#breakfast').val());
      wierdo += `, ${$('#breakfast').val()}`;
    }
    if ($('#freeCancellation').prop('checked')) {
      facilitiesArray.push($('#freeCancellation').val());
      wierdo += `, ${$('#freeCancellation').val()}`;
    }
    if ($('#noPrepayment').prop('checked')) {
      facilitiesArray.push($('#noPrepayment').val());
      wierdo += `, ${$('#noPrepayment').val()}`;
    }
    if ($('#petFriendly').prop('checked')) {
      facilitiesArray.push($('#petFriendly').val());
      console.log($('#petFriendly').val());
      wierdo += `, ${$('#petFriendly').val()}`;
    }
    console.log(facilitiesArray);
    console.log(wierdo);
    let message = {
      name: `${fname} ${sname}`,
      email: email,
      locationName: location,
      description: description,
      locationAddress: address,
      facilities: wierdo,
      price: price,
    };

    postBooking(message);
    console.log(message);

    $('.name').val('');
    $('.email').val('');
    $('.location').val('');
    $('.description').val('');
    $('.address').val('');
    $('.facilities').val('');
    $('.price').val('');

    redirect();

    // $(location).prop('href', `http://${ip}:3000/book`);
    // window.location.replace(`http://${ip}:3000/book`);
  });

  function postBooking(booking) {
    $.post(`http://${ip}/book-post`, booking);
    console.log(ip + 'line  47');
  }
  function redirect() {
    window.location.href = `http://${ip}/book`;
  }
});
