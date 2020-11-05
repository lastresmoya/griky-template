const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyyboiq8RDLbVNKm' }).base(
    'appAZMjzem9BjD3Zt'
);
const tableCourses = base('category')
const tableData = base('politecnico_indoamericano')

const getRecordsByCourses = async () => {
  const records = await tableCourses
      .select({ view: 'grup_by' })
      .firstPage();
  return records
};

const getRecordsDetalles = async () => {
  const records = await tableData
      .select({ view: 'cursos' })
      .firstPage();
  return records
};
getRecordsByCourses().then((courses) => {
  let arr = courses.forEach((element, index) => {
    const wrapper = `
      <section class="pt-5 pb-5">
        <div class="container">
        <div class="row">
        <div class="col-12">
          <h3 class="mb-3">${element.fields.Name} <span class="small">(${element.fields.politecnico_indoamericano.length})<span> </h3>
        </div>
        <div class="col-12">
          <div id="${element.id}" class="row flex-row flex-nowrap" style="overflow:scroll; overflow-y:hidden;">
          </div>
        </div>
      </section
    `
    render(wrapper, window.wrapper)
  })
})

getRecordsDetalles().then((data) => {
  let arr = data.forEach((element, index) => {
    newData = element.fields;
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
    element.fields.category.map(id=>{
      render(card, document.getElementById(id))
    })
  })
});

function render(component, courses) {
  courses.innerHTML += component
}
