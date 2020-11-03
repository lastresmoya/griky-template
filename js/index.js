const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyyboiq8RDLbVNKm' }).base(
    'appAZMjzem9BjD3Zt'
);
const table = base('politecnico_indoamericano')

const getRecords = async () => {
  const records = await table
      .select({ view: 'cursos' })
      .firstPage();
  return records
};

const data = getRecords().then((data) => {
  render(data.length, window.counter)
  data.forEach((element, index) => {
    console.log(element.fields)
    const card = `
      <div class="col-md-3 mb-3">
          <div class="card">
              <img class="img-fluid" style="object-fit:cover; width:auto; height:182px" alt="100%x280" src="${element.fields['img'][0].thumbnails.full.url}">
              <div style="min-height: 270px;" class="card-body">
                  <h5 class="card-title">${element.fields['name']}</h5>
                  <p class="text-truncate">
                    ${element.fields['description']}
                  </p>
                  <p class="card-text">
                    <div class="star-rating">
                      <span class="float-left"><i class="text-warning fa fa-star"></i></span>
                      <span class="float-left"><i class="text-warning fa fa-star"></i></span>
                      <span class="float-left"><i class="text-warning fa fa-star"></i></span>
                      <span class="float-left"><i class="text-warning fa fa-star"></i></span>
                      <span class="float-left"><i class="text-warning fa fa-star"></i></span>
                    </div>
                    <p class="ml-2">
                      5/5
                    </p>
                    <div class="time-rating">
                      <span class="float-left"><i class="text-muted fa fa-trophy"></i></span>
                      <p class="ml-4">${element.fields.badges}</p>
                    </div>
                    <div class="language">
                      <img class="mt-1 float-left img-fluid flag" src="${element.fields.lenguaje === 'Español' ? './img/flag/spain.svg' : './img/flag/usa.png'}" alt="">
                      <p class="ml-2 float-left">${element.fields.lenguaje}</p>
                    </div>
                  </p>
                  <div class="category-tag violet-bg">
                    <span class="float-left"><i class="text-white fas fa-video"></i></span>
                    <p class="ml-4">${element.fields.type}</p>
                  </div>
              </div>
          </div>
      </div>
    `
    if(index <= 7){
      render(card, window.courses)
    }else{
      render(card, window.courses1)
    }
  })
});

function render(component, courses) {
  courses.innerHTML += component
}

