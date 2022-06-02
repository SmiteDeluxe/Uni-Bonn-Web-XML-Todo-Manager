const static_todolistdata = [
    //Abgabe von *** *** und *** ***
    {
        user: "User Name",
        userID: 12334,
        lists: [
            {
                name: "TestListe",
                listID: 1,
                items: [
                  {name: "TestItem 1", taskID: 21, done: false, deadline: "2021-12-01"},
                  {name: "TestItem 2", taskID: 22, done: false, deadline: "2021-11-13"},
                  {name: "TestItem 3", taskID: 23, done: true, deadline: "2021-04-20"},
                  {name: "TestItem 4", taskID: 24, done: true, deadline: "2021-03-17"},
                  {name: "TestItem 5", taskID: 25, done: true, deadline: "2022-02-24"},
                  {name: "TestItem 6", taskID: 26, done: true, deadline: "2021-10-21"},
                  {name: "TestItem 7", taskID: 27, done: true, deadline: "2021-12-09"},
                  {name: "TestItem 8", taskID: 28, done: true, deadline: "2021-09-05"},
                  {name: "TestItem 9", taskID: 29, done: true, deadline: "2023-01-21"},
                  {name: "TestItem 12", taskID: 32, done: false, deadline: "2021-07-31"}, 
                  {name: "TestItem 11", taskID: 31, done: false, deadline: "2021-06-13"},
                  {name: "TestItem 10", taskID: 30, done: false, deadline: "2024-04-17"},
                ]
            },
            {
              name: "Haushalt",
              listID: 2,
              items: [
                {name: "Spülmaschine ausräumen", done: false, taskID: 5},
                {name: "Fenster putzen", done: true, taskID: 6, deadline: "2021-05-15"},
                {name: "Wäsche machen", done: true, taskID: 8},
                {name: "Staubsaugen", done: false, taskID: 7},
              ]
            },
            {
              name: "Projektideen",
              listID: 3,
              items: [
                {name: "Wetterstation", done: false, taskID: 9, deadline: "1995-08-24"},
                {name: "Fahrrad GPS", done: false, taskID: 10, deadline: "2021-04-23"},
                {name: "J.A.R.V.I.S.", done: false, taskID: 11, deadline: "2021-08-15"},
                {name: "Denken", done: true, taskID: 12},
              ]
            },
            {
              name: "Uni-Abgaben",
              listID: 4,
              items: [
                {name: "Stochastik", done: false, taskID: 15, deadline: "2021-08-12"},
                {name: "AlgoII", done: true, taskID: 14, deadline: "2021-10-04"},
                {name: "WebXML", done: true, taskID: 13, deadline: "2021-11-15"},
              ]
            },
            {
              name: "Sonstiges",
              listID: 5,
              items: [
                {name: "Neue Laufschuhe kaufen",taskID: 16, done: false },
                {name: "SpaceX SN15 manuell landen",taskID: 17, done: true},
              ]
            },
            {
                name: "Leere Liste",
                listID: 42,
                items: []
            },

            //New lists
            {
              name: "Bucket-List",
              listID: 100,
              items: [
                {name: "Fallschirmspringen gehen", done: false, taskID: 100},
                {name: "In die USA reisen", done: false, taskID: 101},
                {name: "Zum Moond fliegen", done: false, taskID: 102},
                {name: "Den Dalai Lama küssen", done: true, taskID: 103},
                {name: "Hausverboot beim Dalai Lama bekommen", done: true, taskID: 104},
                {name: "Gegen ein Kangoroo boxen", done: false, taskID:105},
              ]
            },

            {
              name: "Einkaufsliste",
              listID: 101,
              items: [
                {name:"Salz", done: false, taskID: 106},
                {name:"Pfefer", done: false, taskID: 107},
                {name:"Thymian", done: false, taskID: 108},
                {name:"Kreuz-Kümmel", done: false, taskID: 109},
                {name:"Curry", done: false, taskID: 110},
                {name:"Paprika-Pulver", done: false, taskID: 111},
                {name:"Chili-Pulver", done: false, taskID: 112},
                {name:"Kräuter der Provins", done: false, taskID: 113},
              ]
            },
            {
              name: "Dates",
              listID: 102,
              items:[
                {name: "Picknicken gehen", done: true, taskID: 114},
                {name: "Heißluftballon fahren", done: false, taskID: 115, deadline: "2021-05-05"}
              ]
            },
          ]
    }
];

export default static_todolistdata;
