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
  console.log('# hasDB checking db')
  // use system database for this query
  WOQL.db('_system')
  // check if a database with the label MyDemo1 exists
  WOQL.query(Q
    .triple('v:WOQL', 'type', 'system:Database')
    .triple('v:WOQL', 'label', 'v:Label')
    .eq({ '@language': 'en', '@value': 'MyDemo1' }, 'v:Label')
  ).then(response => {
    if (response.bindings.length === 0) {
      console.log('# hasDB creating db')
      // create the database
      WOQL.createDatabase('MyDemo1', {
        label: 'MyDemo1',
        comment: 'DB for MyDemo1 backend',
        schema: true
      }, 'admin')
        .then(() => hasSchema())
    } else {
      console.log('# hasDB Database Already Created')
      hasSchema()
      console.log('# add Object Data to schema')
      addObjectData()
// RER      console.log('# add City Data to schema')
// RER      addCityData()
    }
  }).catch(error => console.log('error', error))
}

// check for schema and examples, add if missing
const hasSchema = () => {
  console.log('# hasSchema checking schema')
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
          .doctype('Object').label('Object')
          .description('An Object is either a City, Person or Null')
          .property('id', 'xsd:integer').label("Object Id").cardinality(1)
// RER          .property('object_type', 'scm:Object').cardinality(1)
          .property('completed', 'xsd:boolean').label("Completed").cardinality(1)
          )
         .then(response => {
          console.log('# add Object Data to schema')
          addObjectData()
/*          // add the schema for class 'scm:City'
          console.log('# creating City schema')
          WOQL.query(Q
        	.doctype("City").label("City")
            .description('An Object of type City')
            .property("city_object", "scm:City").label("City Object")
        	.property("id", "xsd:integer").label("City Id").cardinality(1)
            .property("object_id", "xsd:integer").label("Object Id").cardinality(1)
            ).then(response => {
// RER              console.log('# add City Data to schema')
// RER              addCityData()
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
                  .property("name", "string").label("City Name")
                ).then(response => {
                  // add the schema for class 'scm:Person_Content'
                  console.log('# creating Person Content schema')
                  WOQL.query(Q
                	.doctype("Person_Content").label("Person Content")
                	.description('An Object of type Person Content')
                	.property("id", "xsd:integer").label("Person Content Id").cardinality(1)
                	.property("content_id", "xsd:integer").label("Content Id").cardinality(1)
                	.property("person_id", "xsd:integer").label("Person Id").cardinality(1)
                	.property("first_name", "string").label("First Name")
                	.property("last_name", "string").label("Last Name")
                	.property("age", "xsd:integer").label("Person Age").cardinality(1)
                  ).then(() => {
                      console.log('# Schema Created')
                	  done()
                  }).catch(error => console.log('add Person Content Data error', error))
               }).catch(error => console.log('add City Content Data error', error))
            }).catch(error => console.log('add Person Data error', error))
          }).catch(error => console.log('add City Data error', error))
*/        }).catch(error => console.log('add Oject Data error', error))
      } else {
        console.log('# hasSchema Schema already Created')
// RER        console.log('# add City Data to schema')
// RER        addCityData()
        done()
      }
    })
    .catch(error => console.log('error', error))
}

//Create some Object Object's
const addObjectData = () => {
  console.log('# add object1 data 0')

  //--INSERT INTO test3.object (id, object type) values (0, null);
  WOQL.query(Q
    .add_triple('doc:object1', 'type', 'scm:Object')
    .add_triple('doc:object1', 'id', Q.literal(0, 'xsd:integer'))
// RER    .add_triple('doc:object1', 'type', Q.literal(null, 'string'))
    .add_triple('doc:object1', 'completed', Q.literal(true, 'xsd:boolean'))
    .comment('Add an Object data 0')
  ).then(() => {
    console.log('# add object2 data 1')
    //--INSERT INTO test3.object (id, object_type) values (1, 'City');
    WOQL.query(Q
// RER      .add_triple('doc:object2', 'type', 'scm:Object')
      .add_triple('doc:object2', 'id', Q.literal(1, 'xsd:integer'))
// RER      .add_triple('doc:object2', 'type', Q.literal('City', 'string'))
      .add_triple('doc:object2', 'completed', Q.literal(true, 'xsd:boolean'))
      .comment('Add an Object data 1')
    ).then(() => {
      console.log('# add object3 data 2')
      //--INSERT INTO test3.object (id, object_type) values (2, 'Person');
      WOQL.query(Q
// RER        .add_triple('doc:object3', 'type', 'scm:Object')
        .add_triple('doc:object3', 'id', Q.literal(2, 'xsd:integer'))
// RER        .add_triple('doc:object3', 'type', Q.literal('Person', 'string'))
        .add_triple('doc:object3', 'completed', Q.literal(true, 'xsd:boolean'))
        .comment('Add an Object data 2')
      ).then(() => {
        console.log('# add object4 data 3')
        //--INSERT INTO test3.object (id, object_type) values (3, 'City');
        WOQL.query(Q
// RER          .add_triple('doc:object4', 'type', 'scm:Object')
          .add_triple('doc:object4', 'id', Q.literal(3, 'xsd:integer'))
// RER          .add_triple('doc:object4', 'type', Q.literal('City', 'string'))
          .add_triple('doc:object4', 'completed', Q.literal(true, 'xsd:boolean'))
          .comment('Add an Object data 3')
        ).then(() => {
          console.log('# add object5 data 4')
          //--INSERT INTO test3.object (id, object_type) values (4, 'Person');
          WOQL.query(Q
// RER            .add_triple('doc:object5', 'type', 'scm:Object')
            .add_triple('doc:object5', 'id', Q.literal(4, 'xsd:integer'))
// RER            .add_triple('doc:object5', 'type', Q.literal('Person', 'string'))
            .add_triple('doc:object5', 'completed', Q.literal(true, 'xsd:boolean'))
            .comment('Add an Object data 4')
          ).then(() => {
            console.log('# add object6 data 5')
            //--INSERT INTO test3.object (id, object_type) values (5, 'City');
            WOQL.query(Q
// RER              .add_triple('doc:object6', 'type', 'scm:Object')
              .add_triple('doc:object6', 'id', Q.literal(5, 'xsd:integer'))
// RER              .add_triple('doc:object6', 'type', Q.literal('City', 'string'))
              .add_triple('doc:object6', 'completed', Q.literal(true, 'xsd:boolean'))
              .comment('Add an Object data 5')
            ).then(() => {
              console.log('# add object7 data 6')
              //--INSERT INTO test3.object (id, object_type) values (6, 'Person');
              WOQL.query(Q
// RER                .add_triple('doc:object7', 'type', 'scm:Object')
                .add_triple('doc:object7', 'id', Q.literal(6, 'xsd:integer'))
// RER                .add_triple('doc:object7', 'type', Q.literal('Person', 'string'))
                .add_triple('doc:object7', 'completed', Q.literal(true, 'xsd:boolean'))
                .comment('Add an Object data 6')
              ).then(() => {
                console.log('# add object8 data 7')
                //--INSERT INTO test3.object (id, object_type) values (7, 'Person');
                WOQL.query(Q
// RER                  .add_triple('doc:object8', 'type', 'scm:Object')
                  .add_triple('doc:object8', 'id', Q.literal(7, 'xsd:integer'))
// RER                  .add_triple('doc:object8', 'type', Q.literal('Person', 'string'))
                  .add_triple('doc:object8', 'completed', Q.literal(true, 'xsd:boolean'))
                  .comment('Add an Object data 7')
                ).then(() => {
                  console.log('# add object9 data 8')
                  //--INSERT INTO test3.object (id, object_type) values (8, 'Person');
                  WOQL.query(Q
// RER                    .add_triple('doc:object9', 'type', 'scm:Object')
                    .add_triple('doc:object9', 'id', Q.literal(8, 'xsd:integer'))
// RER                    .add_triple('doc:object9', 'type', Q.literal('Person', 'string'))
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
// RER    .add_triple('doc:city1', 'city_object', 'scm:City')
    .add_triple('doc:city1', 'id', Q.literal(1, 'xsd:integer'))
    .add_triple('doc:city1', 'object_id', Q.literal(1, 'xsd:integer'))
    .comment('Add an City data 0')
  ).then(() => {
    console.log('# add city2 data 1')
    WOQL.query(Q
// RER      .add_triple('doc:city2', 'city_object', 'scm:City')
      .add_triple('doc:city2', 'id', Q.literal(2, 'xsd:integer'))
      .add_triple('doc:city2', 'object_id', Q.literal(3, 'xsd:integer'))
      .comment('Add an City data 1')
    ).then(() => {
      console.log('# add city3 data 2')
      WOQL.query(Q
// RER        .add_triple('doc:city3', 'city_object', 'scm:City')
        .add_triple('doc:city3', 'id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:city3', 'object_id', Q.literal(5, 'xsd:integer'))
        .comment('Add an City data 2')
      ).then(() => {
      }).catch(error => console.log('City Data 2 error', error))
    }).catch(error => console.log('City Data 1 error', error))
  }).catch(error => console.log('City Data 0 error', error))
}

const done = () => {
  console.log('# done')
}
