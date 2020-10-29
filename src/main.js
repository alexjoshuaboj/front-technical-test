import axios from 'axios';



async function printUsers(pApiFilter) {
    let valueWord = $('.form-control').val();
    const getData = await axios(`http://localhost:3000/api/users/filter/?name=${valueWord}&filter=${pApiFilter}`);
    const data = await getData.data;
    $('.row').html('')
    data.forEach(user => {
        $('.row').append(
            `
            <div class="user border rounded col-lg-3 col-md-4">
            <div class="data_user">
            <img src="${user.avatar}" class="img-fluid max-width: 100% height: auto">
            <div class="data">
            <h3>${user.name}</h3>
            <p>Birthday: ${user.birthday.substring(0, 10)}</p>
            <p>Score: ${user.score}</p>
            </div>
            </div>
            </div>
            `
        )
    });


    let limitPerPage = 8;
    $('.row .user:gt(' + (limitPerPage - 1) + ')').hide().addClass('active');
}

printUsers();


$('.form-control').keyup(printUsers)

$('.name').click(function () {
    let pApiFilter = 'sortname';
    printUsers(pApiFilter);
    console.log('hola name');
});

$('.score').click(function () {
    let pApiFilter = 'sortscore';
    printUsers(pApiFilter);
    console.log('hola score');
});

$('.show').click(function () {
    let nrOfUsers = $('.row .user>active').length;
    $('.row .user:eq(' + (nrOfUsers + 8) + ')').show();
})