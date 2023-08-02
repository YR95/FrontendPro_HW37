const roles = {
  admin: "admin.png",
  student: "user.png",
  lector: "lector.png"
};

const gradation = {
  20: "satisfactory", 55: "good", 85: "very-good", 100: "excellent"
};

const users = [{
  name: "Jack Smith",
  age: 23,
  img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922522.svg",
  role: "student",
  courses: [{
    "title": "Front-end Pro", "mark": 20
  }, {
    "title": "Java Enterprise", "mark": 100
  }]
}, {
  name: "Amal Smith",
  age: 20,
  img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922656.svg",
  role: "student"
}, {
  name: "Noah Smith",
  age: 43,
  img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922616.svg",
  role: "student",
  courses: [{
    "title": "Front-end Pro", "mark": 50
  }]
}, {
  name: "Charlie Smith",
  age: 18,
  img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922688.svg",
  role: "student",
  courses: [{
    "title": "Front-end Pro", "mark": 75
  }, {
    "title": "Java Enterprise", "mark": 23
  }]
}, {
  name: "Emily Smith",
  age: 30,
  img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922565.svg",
  role: "admin",
  courses: [{
    "title": "Front-end Pro", "score": 10, "lector": "Leo Smith"
  }, {
    "title": "Java Enterprise", "score": 50, "lector": "David Smith"
  }, {
    "title": "QA", "score": 75, "lector": "Emilie Smith"
  }]
}, {
  name: "Leo Smith",
  age: 253,
  img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922719.svg",
  role: "lector",
  courses: [{
    "title": "Front-end Pro", "score": 78, "studentsScore": 79
  }, {
    "title": "Java Enterprise", "score": 85, "studentsScore": 85
  }]
}]

class User {
  constructor(value) {
    this.name = value.name;
    this.age = value.age;
    this.img = value.img;
    this.role = value.role;
    this.courses = value.courses;
  }

  render() {
  };

  renderCourses() {
    if (this.courses !== undefined) {
      let result = this.courses.map(function (value) {
        let mark = User.evaluateMark(value.mark);

        return `
                  <p class="user__courses--course student">
                    ${value.title} <span class="${mark}">${mark}</span>
                </p>`

      })
      document.write(`<div class="user__courses">${result.join("  ")} </div>`)
    }

  };

  static evaluateMark(mark) {
    let res;
    if (0 < mark && mark < 20) {
      res = "not satisfactory";
    } else if (20 <= mark && mark < 55) {
      res = gradation["20"];
    } else if (55 <= mark && mark < 85) {
      res = gradation["55"];
    } else if (85 <= mark && mark < 100) {
      res = gradation["85"];
    } else {
      res = gradation["100"];
    }

    return res;

  }

}

class Student extends User {
  constructor(value) {
    super(value);
  }

  render() {
    document.write(`
                <div class="user__info">
                <div class="user__info--data">
<!--                    <img src="./user.png" alt="Jack Smith" height="50">-->
                    <img src=${roles.student} alt="Jack Smith" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role student">
                    <img src="graduated.png" alt="student" height="25">
                    <p>${this.role}</p>
                </div>
            </div>`);
  };

  renderCourses() {
    super.renderCourses();
  }

}

class Lector extends User {
  constructor(value) {
    super(value);
  }

  render() {

    document.write(`<div class="user">
            <div class="user__info">
                <div class="user__info--data">
                    <img src=${roles.student} alt="Jack Smith" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role lector">
                    <img src="${roles.lector}" alt="lector" height="25">
                    <p>lector</p>
                </div>
            </div>`);

  }

  renderCourses() {

    let result = this.courses.map(function (value) {
      let score = User.evaluateMark(value.score);
      let stScore = User.evaluateMark(value.studentsScore);

      return `
  <div className="user__courses admin--info" style="padding: 20px">    
        <div className="user__courses--course lector">
              <p>Title: <b>${value.title}</b></p>
              <p>Lector's score: <span className=${score}>${score}</span></p>
              <p>Average student's score: <span className=${stScore}>${stScore}</span></p>
         </div>
  </div>`

    });
    document.write(
        `<div  style=" display:flex; flex-direction:row; " class="user">${result.join(
            " ")}</div>`)
  }

}

class Admin extends User {
  constructor(value) {
    super(value);
  }

  render() {
    document.write(`  <div class="user">
                <div class="user__info">
                   <div class="user__info&#45;&#45;data">
                     <img src=${roles.student} alt="Jack Smith" height="50">
                        <div class="user__naming">
                          <p>Name: <b>${this.name}</b></p>
                          <p>Age: <b>${this.age}</b></p>
                        </div>
                  </div>
                   <div class="user__info&#45;&#45;role admin">
                      <img src=${roles.admin} alt="admin" height="25">
                         <p>admin</p>
                    </div>
                </div>`);
  }

  renderCourses() {
    let result = this.courses.map(function (value) {
      let score = User.evaluateMark(value.score);

      return `<div class="user__courses admin--info">
                <div class="user__courses--course admin">
                    <p>Title: <b>${value.title}</b></p>
                    <p>Admin's score: <span class=${score}>${score}</span></p>
                   <p>Lector: <b>${value.lector}</b></p>
                </div>
</div>`;
    })
    document.write(
        `<div  style=" display:flex; flex-direction:row; " class="user">${result.join(
            " ")}</div>`)
  }
}

users.map(function (value) {
  let x;
  switch (value.role) {
    case "student":
      x = new Student(value);
      break;
    case "admin":
      x = new Admin(value);
      break;
    case "lector":
      x = new Lector(value);
      break;
  }
  console.log(x)
  x.render();
  x.renderCourses();
})
console.log(users)
