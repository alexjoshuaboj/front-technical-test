import axios from 'axios';

async function printUsers(pApiFilter = "sortscore", pLimit = 8, pWord = "a") {
    $('.row').html('')
    const getData = await axios(`http://localhost:3000/api/users/filter/?limit=${pLimit}&filter=${pApiFilter}&name=${pWord}`);
    const data = await getData.data;
    data.forEach(user => {
        $('.row').append(
            `
                <div class="user border rounded col-lg-3 col-md-4">
                    <div class="data_user">
                        <img src="${user.avatar}" class="img-fluid max-width: 100% height: auto">
                        <div class="data">
                            <h3>${user.name}</h3>
                            <p>Birthday: ${user.birthday}</p>
                            <p>Score: ${user.score}</p>
                        </div>
                    </div>
			    </div>
                `
        )
    });
}



printUsers();
