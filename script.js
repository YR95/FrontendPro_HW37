const roles = {
  admin: "https://www.flaticon.com/svg/static/icons/svg/1424/1424453.svg",
  student: "https://www.flaticon.com/svg/static/icons/svg/1424/1424424.svg",
  lector: "https://www.flaticon.com/svg/static/icons/svg/1424/1424450.svg"
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
    } else if (20 <= mark && mark < 50) {
      res = gradation["20"];
    } else if (50 <= mark && mark < 85) {
      res = gradation["55"];
    } else if (85 <= mark && mark < 100) {
      res = gradation["85"];
    } else {
      res = gradation["100"];
    }

    return res;

  }

  static calculateAvarageCourseScore(nameOfCourse) {
    let sum = 0, index = 0, avarege = 0;
    let course = users.filter(function (value) {
      if (value.role === "student" && value.courses !== undefined) {
        {
          return value;
        }
      }
    }).map(value => value.courses)
    let arrCourse = [...course.flat()];
    console.log(arrCourse);

    for (let i = 0; i < arrCourse.length; i++) {
      if (nameOfCourse === arrCourse[i].title) {
        sum = sum + arrCourse[i].mark;
        index++;
      }
    }
    avarege = sum / index;
    console.log(`avarage for course ${nameOfCourse} is ${avarege}`)
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
                    <img src="./user.png" alt="Jack Smith" height="50">
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
                    <img src="./user.png" alt="Jack Smith" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role lector">
                    <img src="./lector.png" alt="lector" height="25">
                    <p>lector</p>
                </div>
            </div>`);

  }

  renderCourses() {
    // <div className="user__courses admin--info">
    //   <div className="user__courses--course lector">
    //     <p>Title: <b>Front-end Pro</b></p>
    //     <p>Lector's score: <span className="satisfactory">Satisfactory</span>
    //     </p>
    //     <p>Average student's score: <span
    //         className="very-good">Very Good</span></p>
    //   </div>
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
                     <img src="./user.png" alt="Jack Smith" height="50">
                        <div class="user__naming">
                          <p>Name: <b>${this.name}</b></p>
                          <p>Age: <b>${this.age}</b></p>
                        </div>
                  </div>
                   <div class="user__info&#45;&#45;role admin">
                      <img src="./admin.png" alt="admin" height="25">
                         <p>admin</p>
                    </div>
                </div>`);
  }
}

User.calculateAvarageCourseScore('Front-end Pro');
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
