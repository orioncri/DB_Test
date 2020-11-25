// Require TerminusDB Client
const Client = require('@terminusdb/terminusdb-client')

// Instantiate database client
const WOQL = new Client.WOQLClient('https://127.0.0.1:6363/',
  { user: 'admin', key: 'root' })

// organization is like user here
WOQL.organization('admin')

// connect
WOQL.connect()
  .then(() => hasDB())
  .catch(error => console.log('error', error))

// create Q alias to build queries
const Q = Client.WOQL

// check for DB, create if missing
const hasDB = () => {
  console.log('# checking db')
  // use system database for this query
  WOQL.db('_system')
  // check if a database with the label MyDemo1 exists
  WOQL.query(Q
    .triple('v:WOQL', 'type', 'system:Database')
    .triple('v:WOQL', 'label', 'v:Label')
    .eq({ '@language': 'en', '@value': 'MyDemo1' }, 'v:Label')
  ).then(response => {
    if (response.bindings.length === 0) {
      console.log('# creating db')
      // create the database
      WOQL.createDatabase('MyDemo1', {
        label: 'MyDemo1',
        comment: 'DB for MyDemo1 backend',
        schema: true
      }, 'admin')
        .then(() => {
// RER            hasObjectSchema()
// RER            hasCitySchema()
// RER            hasPersonSchema()
// RER            hasCityContentSchema()
            hasPersonContentSchema()
        })
    } else {
      console.log('# has db')
// RER      hasObjectSchema()
// RER      addObjectData()
// RER      hasCitySchema()
// RER      addCityData()
// RER      hasPersonSchema()
// RER      addPersonData()
// RER      hasCityContentSchema()
// RER      addCityContentData()
      hasPersonContentSchema()
      addPersonContentData()
    }
  }).catch(error => console.log('error', error))
}

// check for Object schema, add if missing
const hasObjectSchema = () => {
  console.log('# checking Object schema')
  // set database to use to MyDemo1
  WOQL.db('MyDemo1')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:Object')
  )
    .then(response => {
      if (response.bindings.length === 0) {
        console.log('# creating Object schema')
        // add the schema for class 'scm:Object'
        WOQL.query(Q
          .doctype('Object')
          .label('Object')
          .description('An Object is either a City, Person or Null')
          .property('id', 'xsd:integer').cardinality(1)
          .property('completed', 'xsd:boolean').cardinality(1)
        ).then(response => {
          // add the schema for class 'scm:City'
/*            console.log('# creating City schema')
            WOQL.query(Q
          	  .doctype("City").label("City")
              .description('An Object of type City')
              .property("city_object", "scm:City").label("City Object")
          	  .property("id", "xsd:integer").label("City Id").cardinality(1)
              .property("object_id", "xsd:integer").label("Object Id").cardinality(1)
              ).then(response => {
             	 // add the schema for class 'scm:Person'
                console.log('# creating Person schema')
                WOQL.query(Q
                  .doctype("Person").label("Person")
              	.description('An Object of type Person')
                  .property("person_object", "Person").label("Person Object")
                  .property("id", "xsd:integer").label("Person Id").cardinality(1)
                  .property("object_id", "xsd:integer").label("Object Id").cardinality(1)
                ).then(response => {
                  // add the schema for class 'scm:City_Content'
                  console.log('# creating City Content schema')
                  WOQL.query(Q
                    .doctype("City_Content").label("City_Content")
                    .description('An Object of type City Content')
                    .property("id", "xsd:integer").label("City Content Id").cardinality(1)
                    .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                    .property("city_id", "xsd:integer").label("City Id").cardinality(1)
                    .property("name", "xsd:string").label("City Name")
                  ).then(response => {
                    // add the schema for class 'scm:Person_Content'
                    console.log('# creating Person Content schema')
                    WOQL.query(Q
                  	.doctype("Person_Content").label("Person Content")
                  	.description('An Object of type Person Content')
                  	.property("id", "xsd:integer").label("Person Content Id").cardinality(1)
                  	.property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                  	.property("person_id", "xsd:integer").label("Person Id").cardinality(1)
                  	.property("first_name", "xsd:string").label("First Name")
                  	.property("last_name", "xsd:string").label("Last Name")
                  	.property("age", "xsd:integer").label("Person Age").cardinality(1)
                    ).then(() => {
                      console.log('# Schema Created')
                  	  done()
                    }).catch(error => console.log('add Person Content Data error', error))
                 }).catch(error => console.log('add City Content Data error', error))
              }).catch(error => console.log('add Person Data error', error))
            }).catch(error => console.log('add City Data error', error))
*/        }).catch(error => console.log('add Object Data error', error))
      } else {
        console.log('# Object schema already created')
        done()
      }
    })
    .catch(error => console.log('error', error))
}

//check for City schema, add if missing
const hasCitySchema = () => {
  console.log('# checking City schema')
  // set database to use to MyDemo1
  WOQL.db('MyDemo1')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:City')
  )
    .then(response => {
      if (response.bindings.length === 0) {
            // add the schema for class 'scm:City'
            console.log('# creating City schema')
            WOQL.query(Q
          	  .doctype("City").label("City")
              .description('An Object of type City')
          	  .property("id", "xsd:integer").label("City Id").cardinality(1)
              .property("object_id", "xsd:integer").label("Object Id").cardinality(1)
              ).then(response => {
/*             	 // add the schema for class 'scm:Person'
                console.log('# creating Person schema')
                WOQL.query(Q
                  .doctype("Person").label("Person")
              	.description('An Object of type Person')
                  .property("person_object", "Person").label("Person Object")
                  .property("id", "xsd:integer").label("Person Id").cardinality(1)
                  .property("object_id", "xsd:integer").label("Object Id").cardinality(1)
                ).then(response => {
                  // add the schema for class 'scm:City_Content'
                  console.log('# creating City Content schema')
                  WOQL.query(Q
                    .doctype("City_Content").label("City_Content")
                    .description('An Object of type City Content')
                    .property("id", "xsd:integer").label("City Content Id").cardinality(1)
                    .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                    .property("city_id", "xsd:integer").label("City Id").cardinality(1)
                    .property("name", "xsd:string").label("City Name")
                  ).then(response => {
                    // add the schema for class 'scm:Person_Content'
                    console.log('# creating Person Content schema')
                    WOQL.query(Q
                  	.doctype("Person_Content").label("Person Content")
                  	.description('An Object of type Person Content')
                  	.property("id", "xsd:integer").label("Person Content Id").cardinality(1)
                  	.property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                  	.property("person_id", "xsd:integer").label("Person Id").cardinality(1)
                  	.property("first_name", "xsd:string").label("First Name")
                  	.property("last_name", "xsd:string").label("Last Name")
                  	.property("age", "xsd:integer").label("Person Age").cardinality(1)
                    ).then(() => {
                      console.log('# Schema Created')
                  	  done()
                    }).catch(error => console.log('add Person Content Data error', error))
                 }).catch(error => console.log('add City Content Data error', error))
              }).catch(error => console.log('add Person Data error', error))
*/            }).catch(error => console.log('add City Data error', error))
      } else {
        console.log('# Datbase City schema already created')
        done()
      }
    })
    .catch(error => console.log('error', error))
}

//check for Person schema, add if missing
const hasPersonSchema = () => {
  console.log('# checking Person schema')
  // set database to use to MyDemo1
  WOQL.db('MyDemo1')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:Person')
  )
    .then(response => {
      if (response.bindings.length === 0) {
             	 // add the schema for class 'scm:Person'
                console.log('# creating Person schema')
                WOQL.query(Q
                  .doctype("Person").label("Person")
              	.description('An Object of type Person')
                  .property("person_object", "Person").label("Person Object")
                  .property("id", "xsd:integer").label("Person Id").cardinality(1)
                  .property("object_id", "xsd:integer").label("Object Id").cardinality(1)
                ).then(response => {
/*                  // add the schema for class 'scm:City_Content'
                  console.log('# creating City Content schema')
                  WOQL.query(Q
                    .doctype("City_Content").label("City_Content")
                    .description('An Object of type City Content')
                    .property("id", "xsd:integer").label("City Content Id").cardinality(1)
                    .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                    .property("city_id", "xsd:integer").label("City Id").cardinality(1)
                    .property("name", "xsd:string").label("City Name")
                  ).then(response => {
                    // add the schema for class 'scm:Person_Content'
                    console.log('# creating Person Content schema')
                    WOQL.query(Q
                  	.doctype("Person_Content").label("Person Content")
                  	.description('An Object of type Person Content')
                  	.property("id", "xsd:integer").label("Person Content Id").cardinality(1)
                  	.property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                  	.property("person_id", "xsd:integer").label("Person Id").cardinality(1)
                  	.property("first_name", "xsd:string").label("First Name")
                  	.property("last_name", "xsd:string").label("Last Name")
                  	.property("age", "xsd:integer").label("Person Age").cardinality(1)
                    ).then(() => {
                      console.log('# Schema Created')
                  	  done()
                    }).catch(error => console.log('add Person Content Data error', error))
                 }).catch(error => console.log('add City Content Data error', error))
*/              }).catch(error => console.log('add Person Data error', error))
      } else {
        console.log('# Datbase Person schema already created')
        done()
      }
    })
    .catch(error => console.log('error', error))
}

//check for CityContent schema, add if missing
const hasCityContentSchema = () => {
  console.log('# checking CityContent schema')
  // set database to use to MyDemo1
  WOQL.db('MyDemo1')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:CityContent')
  )
    .then(response => {
      if (response.bindings.length === 0) {
        // add the schema for class 'scm:City_Content'
        console.log('# creating City Content schema')
        WOQL.query(Q
          .doctype("CityContent").label("City_Content")
          .description('An Object of type City Content')
          .property("id", "xsd:integer").label("City Content Id").cardinality(1)
          .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
          .property("city_id", "xsd:integer").label("City Id").cardinality(1)
          .property("name", "xsd:string").label("City Name")
        ).then(response => {
/*          // add the schema for class 'scm:Person_Content'
          console.log('# creating Person Content schema')
          WOQL.query(Q
        	.doctype("Person_Content").label("Person Content")
        	.description('An Object of type Person Content')
        	.property("id", "xsd:integer").label("Person Content Id").cardinality(1)
        	.property("content_id", "xsd:integer").label("Content Id").cardinality(1)
        	.property("person_id", "xsd:integer").label("Person Id").cardinality(1)
        	.property("first_name", "xsd:string").label("First Name")
        	.property("last_name", "xsd:string").label("Last Name")
        	.property("age", "xsd:integer").label("Person Age").cardinality(1)
          ).then(() => {
            console.log('# Schema Created')
            done()
          }).catch(error => console.log('add Person Content Data error', error))
*/        }).catch(error => console.log('add City Content Data error', error))
      } else {
        console.log('# Database CityContent schema already created')
        done()
      }
    })
    .catch(error => console.log('CityContent error', error))
}

//check for PersonContent schema, add if missing
const hasPersonContentSchema = () => {
  console.log('# checking PersonContent schema')
  // set database to use to MyDemo1
  WOQL.db('MyDemo1')
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:PersonContent')
  )
    .then(response => {
      if (response.bindings.length === 0) {
          // add the schema for class 'scm:PersonContent'
          console.log('# creating Person Content schema')
          WOQL.query(Q
        	.doctype("PersonContent").label("Person Content")
        	.description('An Object of type Person Content')
        	.property("id", "xsd:integer").label("Person Content Id").cardinality(1)
        	.property("content_id", "xsd:integer").label("Content Id").cardinality(1)
        	.property("person_id", "xsd:integer").label("Person Id").cardinality(1)
        	.property("first_name", "xsd:string").label("First Name")
        	.property("last_name", "xsd:string").label("Last Name")
        	.property("age", "xsd:integer").label("Person Age").cardinality(1)
        	.property("city_id", "xsd:integer").label("City Id").cardinality(1)
          ).then(() => {
            console.log('# PersonContent Schema Created')
            done()
          }).catch(error => console.log('add Person Content Data error', error))
      } else {
        console.log('# Database PersonContent schema already created')
        done()
      }
    })
    .catch(error => console.log('PersonContent error', error))
}

//Create some Object Object's
const addObjectData = () => {
  console.log('# add object1 data 0')
  WOQL.query(Q
    .add_triple('doc:object1', 'type', 'scm:Object')
    .add_triple('doc:object1', 'id', Q.literal(0, 'xsd:integer'))
    .add_triple('doc:object1', 'completed', Q.literal(true, 'xsd:boolean'))
    .comment('Add an Object data 0')
  ).then(() => {
    console.log('# add object2 data 1')
    WOQL.query(Q
      .add_triple('doc:object2', 'type', 'scm:Object')
      .add_triple('doc:object2', 'id', Q.literal(1, 'xsd:integer'))
      .add_triple('doc:object2', 'completed', Q.literal(true, 'xsd:boolean'))
      .comment('Add an Object data 1')
    ).then(() => {
      console.log('# add object3 data 2')
      WOQL.query(Q
        .add_triple('doc:object3', 'type', 'scm:Object')
        .add_triple('doc:object3', 'id', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:object3', 'completed', Q.literal(true, 'xsd:boolean'))
        .comment('Add an Object data 2')
      ).then(() => {
        console.log('# add object4 data 3')
        WOQL.query(Q
          .add_triple('doc:object4', 'type', 'scm:Object')
          .add_triple('doc:object4', 'id', Q.literal(3, 'xsd:integer'))
          .add_triple('doc:object4', 'completed', Q.literal(true, 'xsd:boolean'))
          .comment('Add an Object data 3')
        ).then(() => {
          console.log('# add object5 data 4')
          WOQL.query(Q
            .add_triple('doc:object5', 'type', 'scm:Object')
            .add_triple('doc:object5', 'id', Q.literal(4, 'xsd:integer'))
            .add_triple('doc:object5', 'completed', Q.literal(true, 'xsd:boolean'))
            .comment('Add an Object data 4')
          ).then(() => {
            console.log('# add object6 data 5')
            WOQL.query(Q
              .add_triple('doc:object6', 'type', 'scm:Object')
              .add_triple('doc:object6', 'id', Q.literal(5, 'xsd:integer'))
              .add_triple('doc:object6', 'completed', Q.literal(true, 'xsd:boolean'))
              .comment('Add an Object data 5')
            ).then(() => {
              console.log('# add object7 data 6')
              WOQL.query(Q
                .add_triple('doc:object7', 'type', 'scm:Object')
                .add_triple('doc:object7', 'id', Q.literal(6, 'xsd:integer'))
                .add_triple('doc:object7', 'completed', Q.literal(true, 'xsd:boolean'))
                .comment('Add an Object data 6')
              ).then(() => {
                console.log('# add object8 data 7')
                WOQL.query(Q
                  .add_triple('doc:object8', 'type', 'scm:Object')
                  .add_triple('doc:object8', 'id', Q.literal(7, 'xsd:integer'))
                  .add_triple('doc:object8', 'completed', Q.literal(true, 'xsd:boolean'))
                  .comment('Add an Object data 7')
                ).then(() => {
                  console.log('# add object9 data 8')
                  WOQL.query(Q
                    .add_triple('doc:object9', 'type', 'scm:Object')
                    .add_triple('doc:object9', 'id', Q.literal(8, 'xsd:integer'))
                    .add_triple('doc:object9', 'completed', Q.literal(true, 'xsd:boolean'))
                    .comment('Add an Object data 8')
                  ).then(() => done()
                  ).catch(error => console.log('Object Data 8 error', error))
                }).catch(error => console.log('Object Data 7 error', error))
              }).catch(error => console.log('Object Data 6 error', error))
            }).catch(error => console.log('Object Data 5 error', error))
          }).catch(error => console.log('Object Data 4 error', error))
        }).catch(error => console.log('Object Data 3 error', error))
      }).catch(error => console.log('Object Data 2 error', error))
    }).catch(error => console.log('Object Data 1 error', error))
  }).catch(error => console.log('Object Data 0 error', error))
}

//Create some City Object's
const addCityData = () => {
  console.log('# add city1 data 0')

  WOQL.query(Q
    .add_triple('doc:city1', 'type', 'scm:City')
    .add_triple('doc:city1', 'id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:city1', 'object_id', Q.literal(1, 'xsd:integer'))
    .comment('Add an City data 0')
  ).then(() => {
    console.log('# add city2 data 1')
    WOQL.query(Q
      .add_triple('doc:city2', 'type', 'scm:City')
      .add_triple('doc:city2', 'id', Q.literal(2, 'xsd:integer'))
      .add_triple('doc:city2', 'object_id', Q.literal(3, 'xsd:integer'))
      .comment('Add an City data 1')
    ).then(() => {
      console.log('# add city3 data 2')
      WOQL.query(Q
        .add_triple('doc:city3', 'type', 'scm:City')
        .add_triple('doc:city3', 'id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:city3', 'object_id', Q.literal(5, 'xsd:integer'))
        .comment('Add an City data 2')
      ).then(() => {
      }).catch(error => console.log('City Data 2 error', error))
    }).catch(error => console.log('City Data 1 error', error))
  }).catch(error => console.log('City Data 0 error', error))
}

//Create some Person Object's
const addPersonData = () => {
  console.log('# add person1 data 0')
  WOQL.query(Q
    .add_triple('doc:person1', 'type', 'scm:Person')
    .add_triple('doc:person1', 'id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:person1', 'object_id', Q.literal(2, 'xsd:integer'))
    .comment('Add an Person data 0')
  ).then(() => {
    console.log('# add person2 data 1')
    WOQL.query(Q
      .add_triple('doc:person2', 'type', 'scm:Person')
      .add_triple('doc:person2', 'id', Q.literal(2, 'xsd:integer'))
      .add_triple('doc:person2', 'object_id', Q.literal(4, 'xsd:integer'))
      .comment('Add an Person data 1')
    ).then(() => {
      console.log('# add person3 data 2')
      WOQL.query(Q
        .add_triple('doc:person3', 'type', 'scm:Person')
        .add_triple('doc:person3', 'id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:person3', 'object_id', Q.literal(6, 'xsd:integer'))
        .comment('Add an Person data 2')
      ).then(() => {
        console.log('# add person4 data 3')
        WOQL.query(Q
          .add_triple('doc:person4', 'type', 'scm:Person')
          .add_triple('doc:person4', 'id', Q.literal(4, 'xsd:integer'))
          .add_triple('doc:person4', 'object_id', Q.literal(7, 'xsd:integer'))
          .comment('Add an Person data 4')
        ).then(() => {
          console.log('# add person5 data 4')
          WOQL.query(Q
            .add_triple('doc:person5', 'type', 'scm:Person')
            .add_triple('doc:person5', 'id', Q.literal(5, 'xsd:integer'))
            .add_triple('doc:person5', 'object_id', Q.literal(8, 'xsd:integer'))
            .comment('Add an Person data 4')
          ).then(() => {
          }).catch(error => console.log('Person Data 4 error', error))
        }).catch(error => console.log('Person Data 3 error', error))
      }).catch(error => console.log('Person Data 2 error', error))
    }).catch(error => console.log('Person Data 1 error', error))
  }).catch(error => console.log('Person Data 0 error', error))
}

//Create some PersonContent Object's
const addPersonContentData = () => {
  console.log('# add personContent1 data 0')
  WOQL.query(Q
    .add_triple('doc:personContent1', 'type', 'scm:PersonContent')
    .add_triple('doc:personContent1', 'id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:personContent1', 'content_id', Q.literal(2, 'xsd:integer'))
    .add_triple('doc:personContent1', 'person_id', Q.literal(2, 'xsd:integer'))
    .add_triple('doc:personContent1', 'first_name', Q.literal('Duane', 'xsd:string'))
    .add_triple('doc:personContent1', 'last_name', Q.literal('Knesek', 'xsd:string'))
    .add_triple('doc:personContent1', 'age', Q.literal(21, 'xsd:integer'))
    .add_triple('doc:personContent1', 'city_id', Q.literal(1, 'xsd:integer'))
    .comment('Add an PersonContent data 0')
  ).then(() => {
    console.log('# add personContent2 data 1')
    WOQL.query(Q
      .add_triple('doc:personContent2', 'type', 'scm:PersonContent')
      .add_triple('doc:personContent2', 'id', Q.literal(2, 'xsd:integer'))
      .add_triple('doc:personContent2', 'content_id', Q.literal(4, 'xsd:integer'))
      .add_triple('doc:personContent2', 'person_id', Q.literal(4, 'xsd:integer'))
      .add_triple('doc:personContent2', 'first_name', Q.literal('kelley', 'xsd:string'))
      .add_triple('doc:personContent2', 'last_name', Q.literal('Hughes', 'xsd:string'))
      .add_triple('doc:personContent2', 'age', Q.literal(21, 'xsd:integer'))
      .add_triple('doc:personContent2', 'city_id', Q.literal(3, 'xsd:integer'))
      .comment('Add an PersonContent data 1')
    ).then(() => {
      console.log('# add personContent3 data 2')
      WOQL.query(Q
        .add_triple('doc:personContent3', 'type', 'scm:PersonContent')
        .add_triple('doc:personContent3', 'id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:personContent3', 'content_id', Q.literal(6, 'xsd:integer'))
        .add_triple('doc:personContent3', 'person_id', Q.literal(6, 'xsd:integer'))
        .add_triple('doc:personContent3', 'first_name', Q.literal('Michaela', 'xsd:string'))
        .add_triple('doc:personContent3', 'last_name', Q.literal('Kidd', 'xsd:string'))
        .add_triple('doc:personContent3', 'age', Q.literal(21, 'xsd:integer'))
        .add_triple('doc:personContent3', 'city_id', Q.literal(5, 'xsd:integer'))
        .comment('Add an PersonContent data 2')
      ).then(() => {
          console.log('# add personContent4 data 3')
          WOQL.query(Q
            .add_triple('doc:personContent4', 'type', 'scm:PersonContent')
            .add_triple('doc:personContent4', 'id', Q.literal(4, 'xsd:integer'))
            .add_triple('doc:personContent4', 'content_id', Q.literal(7, 'xsd:integer'))
            .add_triple('doc:personContent4', 'person_id', Q.literal(7, 'xsd:integer'))
            .add_triple('doc:personContent4', 'first_name', Q.literal('Luis', 'xsd:string'))
            .add_triple('doc:personContent4', 'last_name', Q.literal('Marrufo', 'xsd:string'))
            .add_triple('doc:personContent4', 'age', Q.literal(22, 'xsd:integer'))
            .add_triple('doc:personContent4', 'city_id', Q.literal(1, 'xsd:integer'))
            .comment('Add an PersonContent data 3')
          ).then(() => {
              console.log('# add personContent5 data 4')
              WOQL.query(Q
                .add_triple('doc:personContent5', 'type', 'scm:PersonContent')
                .add_triple('doc:personContent5', 'id', Q.literal(5, 'xsd:integer'))
                .add_triple('doc:personContent5', 'content_id', Q.literal(8, 'xsd:integer'))
                .add_triple('doc:personContent5', 'person_id', Q.literal(4, 'xsd:integer'))
                .add_triple('doc:personContent5', 'first_name', Q.literal('Kelley', 'xsd:string'))
                .add_triple('doc:personContent5', 'last_name', Q.literal('Hughes', 'xsd:string'))
                .add_triple('doc:personContent5', 'age', Q.literal(21, 'xsd:integer'))
                .add_triple('doc:personContent5', 'city_id', Q.literal(3, 'xsd:integer'))
                .comment('Add an PersonContent data 4')
              ).then(() => {
                  console.log('# add personContent6 data 5')
                  WOQL.query(Q
                    .add_triple('doc:personContent6', 'type', 'scm:PersonContent')
                    .add_triple('doc:personContent6', 'id', Q.literal(6, 'xsd:integer'))
                    .add_triple('doc:personContent6', 'content_id', Q.literal(10, 'xsd:integer'))
                    .add_triple('doc:personContent6', 'person_id', Q.literal(4, 'xsd:integer'))
                    .add_triple('doc:personContent6', 'first_name', Q.literal('Kelley', 'xsd:string'))
                    .add_triple('doc:personContent6', 'last_name', Q.literal('Hughes', 'xsd:string'))
                    .add_triple('doc:personContent6', 'age', Q.literal(21, 'xsd:integer'))
                    .add_triple('doc:personContent6', 'city_id', Q.literal(3, 'xsd:integer'))
                    .comment('Add an PersonContent data 5')
                  ).then(() => {
                      console.log('# add personContent7 data 6')
                      WOQL.query(Q
                        .add_triple('doc:personContent7', 'type', 'scm:PersonContent')
                        .add_triple('doc:personContent7', 'id', Q.literal(7, 'xsd:integer'))
                        .add_triple('doc:personContent7', 'content_id', Q.literal(11, 'xsd:integer'))
                        .add_triple('doc:personContent7', 'person_id', Q.literal(8, 'xsd:integer'))
                        .add_triple('doc:personContent7', 'first_name', Q.literal('JD', 'xsd:string'))
                        .add_triple('doc:personContent7', 'last_name', Q.literal('Bone', 'xsd:string'))
                        .add_triple('doc:personContent7', 'age', Q.literal(22, 'xsd:integer'))
                        .add_triple('doc:personContent7', 'city_id', Q.literal(1, 'xsd:integer'))
                        .comment('Add an PersonContent data 6')
                      ).then(() => {
                          console.log('# add personContent8 data 7')
                          WOQL.query(Q
                            .add_triple('doc:personContent8', 'type', 'scm:PersonContent')
                            .add_triple('doc:personContent8', 'id', Q.literal(8, 'xsd:integer'))
                            .add_triple('doc:personContent8', 'content_id', Q.literal(13, 'xsd:integer'))
                            .add_triple('doc:personContent8', 'person_id', Q.literal(4, 'xsd:integer'))
                            .add_triple('doc:personContent8', 'first_name', Q.literal('Kelley', 'xsd:string'))
                            .add_triple('doc:personContent8', 'last_name', Q.literal('Hughes', 'xsd:string'))
                            .add_triple('doc:personContent8', 'age', Q.literal(21, 'xsd:integer'))
                            .add_triple('doc:personContent8', 'city_id', Q.literal(1, 'xsd:integer'))
                            .comment('Add an PersonContent data 7')
                          ).then(() => {
                              console.log('# add personContent9 data 8')
                              WOQL.query(Q
                                .add_triple('doc:personContent9', 'type', 'scm:PersonContent')
                                .add_triple('doc:personContent9', 'id', Q.literal(9, 'xsd:integer'))
                                .add_triple('doc:personContent9', 'content_id', Q.literal(14, 'xsd:integer'))
                                .add_triple('doc:personContent9', 'person_id', Q.literal(4, 'xsd:integer'))
                                .add_triple('doc:personContent9', 'first_name', Q.literal('Kelley', 'xsd:string'))
                                .add_triple('doc:personContent9', 'last_name', Q.literal('Hughes', 'xsd:string'))
                                .add_triple('doc:personContent9', 'age', Q.literal(22, 'xsd:integer'))
                                .add_triple('doc:personContent9', 'city_id', Q.literal(3, 'xsd:integer'))
                                .comment('Add an PersonContent data 8')
                              ).then(() => {
                              }).catch(error => console.log('PersonContent Data 8 error', error))
                          }).catch(error => console.log('PersonContent Data 7 error', error))
                      }).catch(error => console.log('PersonContent Data 6 error', error))
                  }).catch(error => console.log('PersonContent Data 5 error', error))
              }).catch(error => console.log('PersonContent Data 4 error', error))
          }).catch(error => console.log('PersonContent Data 3 error', error))
      }).catch(error => console.log('PersonContent Data 2 error', error))
    }).catch(error => console.log('PersonContent Data 1 error', error))
  }).catch(error => console.log('PersonContent Data 0 error', error))
}

//Create some CityContent Object's
const addCityContentData = () => {
	console.log('# add cityContent1 data 0')
  WOQL.query(Q
    .add_triple('doc:cityContent1', 'type', 'scm:CityContent')
    .add_triple('doc:cityContent1', 'id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:cityContent1', 'content_id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:cityContent1', 'city_id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:cityContent1', 'name', Q.literal('Fort Worth', 'xsd:string'))
    .comment('Add an CityContent data 0')
  ).then(() => {
    console.log('# add cityContent2 data 1')
    WOQL.query(Q
      .add_triple('doc:cityContent2', 'type', 'scm:CityContent')
      .add_triple('doc:cityContent2', 'id', Q.literal(2, 'xsd:integer'))
      .add_triple('doc:cityContent2', 'content_id', Q.literal(3, 'xsd:integer'))
      .add_triple('doc:cityContent2', 'city_id', Q.literal(3, 'xsd:integer'))
      .add_triple('doc:cityContent2', 'name', Q.literal('Dallas', 'xsd:string'))
      .comment('Add an CityContent data 1')
    ).then(() => {
      console.log('# add cityContent3 data 2')
      WOQL.query(Q
        .add_triple('doc:cityContent3', 'type', 'scm:CityContent')
        .add_triple('doc:cityContent3', 'id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:cityContent3', 'content_id', Q.literal(5, 'xsd:integer'))
        .add_triple('doc:cityContent3', 'city_id', Q.literal(5, 'xsd:integer'))
        .add_triple('doc:cityContent3', 'name', Q.literal('Arlington', 'xsd:string'))
        .comment('Add an CityContent data 2')
      ).then(() => {
          console.log('# add cityContent4 data 3')
          WOQL.query(Q
            .add_triple('doc:cityContent4', 'type', 'scm:CityContent')
            .add_triple('doc:cityContent4', 'id', Q.literal(4, 'xsd:integer'))
            .add_triple('doc:cityContent4', 'content_id', Q.literal(9, 'xsd:integer'))
            .add_triple('doc:cityContent4', 'city_id', Q.literal(1, 'xsd:integer'))
            .add_triple('doc:cityContent4', 'name', Q.literal('Fort Worth', 'xsd:string'))
            .comment('Add an CityContent data 3')
          ).then(() => {
              console.log('# add cityContent5 data 4')
              WOQL.query(Q
                .add_triple('doc:cityContent5', 'type', 'scm:CityContent')
                .add_triple('doc:cityContent5', 'id', Q.literal(5, 'xsd:integer'))
                .add_triple('doc:cityContent5', 'content_id', Q.literal(12, 'xsd:integer'))
                .add_triple('doc:cityContent5', 'city_id', Q.literal(1, 'xsd:integer'))
                .add_triple('doc:cityContent5', 'name', Q.literal('Fort Worth', 'xsd:string'))
                .comment('Add an CityContent data 4')
              ).then(() => {
                  console.log('# add cityContent6 data 5')
                  WOQL.query(Q
                    .add_triple('doc:cityContent6', 'type', 'scm:CityContent')
                    .add_triple('doc:cityContent6', 'id', Q.literal(6, 'xsd:integer'))
                    .add_triple('doc:cityContent6', 'content_id', Q.literal(15, 'xsd:integer'))
                    .add_triple('doc:cityContent6', 'city_id', Q.literal(1, 'xsd:integer'))
                    .add_triple('doc:cityContent6', 'name', Q.literal('Fort Worth', 'xsd:string'))
                    .comment('Add an CityContent data 5')
                  ).then(() => {
                      console.log('# add cityContent7 data 6')
                      WOQL.query(Q
                        .add_triple('doc:cityContent7', 'type', 'scm:CityContent')
                        .add_triple('doc:cityContent7', 'id', Q.literal(7, 'xsd:integer'))
                        .add_triple('doc:cityContent7', 'content_id', Q.literal(16, 'xsd:integer'))
                        .add_triple('doc:cityContent7', 'city_id', Q.literal(3, 'xsd:integer'))
                        .add_triple('doc:cityContent7', 'name', Q.literal('Asstown', 'xsd:string'))
                        .comment('Add an CityContent data 6')
                      ).then(() => {
                      }).catch(error => console.log('CityContent Data 2 error', error))
                  }).catch(error => console.log('CityContent Data 2 error', error))
              }).catch(error => console.log('CityContent Data 2 error', error))
          }).catch(error => console.log('CityContent Data 2 error', error))
      }).catch(error => console.log('CityContent Data 2 error', error))
    }).catch(error => console.log('CityContent Data 1 error', error))
  }).catch(error => console.log('CityContent Data 0 error', error))
}

const done = () => {
  console.log('# done')
}