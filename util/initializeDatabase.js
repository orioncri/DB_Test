// Require TerminusDB Client
const Client = require('@terminusdb/terminusdb-client')

// Instantiate database client
const DB = new Client.WOQLClient('https://127.0.0.1:6363/',
  { user: 'admin', key: 'root' })

// organization is like user here
DB.organization('admin')

// connect
DB.connect()
  .then(() => hasDB())
  .catch(error => console.log('error', error))

// create Q alias to build queries
const Q = Client.WOQL

// check for DB, create if missing
const hasDB = () => {
  console.log('# checking db')
  // use system database for this query
  DB.db('_system')
  // check if a database with the label MyDemo exists
  DB.query(Q
    .triple('v:DB', 'type', 'system:Database')
    .triple('v:DB', 'label', 'v:Label')
    .eq({ '@language': 'en', '@value': 'MyDemo' }, 'v:Label')
  ).then(response => {
    if (response.bindings.length === 0) {
      console.log('# creating db')
      // create the database
      DB.createDatabase('MyDemo', {
        label: 'MyDemo',
        comment: 'DB for MyDemo backend',
        schema: true
      }, 'admin')
        .then(() => hasSchema())
    } else {
      console.log('# has db')
      hasSchema()
    }
  }).catch(error => console.log('error', error))
}

// check for schema and examples, add if missing
const hasSchema = () => {
  console.log('# checking schema')
  // set database to use to MyDemo
  DB.db('MyDemo')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  DB.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:Object')
  )
    .then(response => {
      if (response.bindings.length === 0) {
        console.log('# creating schema')
        // add the schema for class 'scm:Object'
        DB.query(Q
          .doctype('Object')
          .label('Object_Type')
          .description('Currently either City or Person')
          .property('id', 'xsd:integer').cardinality(1)
          .property('object_type', 'xsd:string').cardinality(1)
          .property('completed', 'xsd:boolean').cardinality(1)
        ).then(response => {
// RER          addExamples()
        }).catch(error => console.log('error', error))
      } else {
        console.log('# has schema')
        done()
      }
    })
    .catch(error => console.log('error', error))
}

// Create some example Object's
const addExamples = () => {
  console.log('# add data 0')

  //--INSERT INTO test3.object (id, object_type) values (0, null);
  DB.query(Q
    .add_triple('doc:Object', 'object_type', 'scm:Object')
    .add_triple('doc:Object', 'id', Q.literal(0, 'integer'))
    .add_triple('doc:Object', 'object_type', Q.literal(null, 'string'))
    .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
    .comment('Add an example data 0')
  ).then(() => {
    console.log('# add data 0')
    //--INSERT INTO test3.object (id, object_type) values (1, 'City');
    DB.query(Q
      .add_triple('doc:Object', 'object_type', 'scm:Object')
      .add_triple('doc:Object', 'id', Q.literal(1, 'integer'))
      .add_triple('doc:Object', 'object_type', Q.literal('City', 'string'))
      .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
      .comment('Add an example data 1')
    ).then(() => {
      console.log('# add data 1')
      //--INSERT INTO test3.object (id, object_type) values (2, 'Person');
      DB.query(Q
        .add_triple('doc:Object', 'object_type', 'scm:Object')
        .add_triple('doc:Object', 'id', Q.literal(2, 'integer'))
        .add_triple('doc:Object', 'object_type', Q.literal('Person', 'string'))
        .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
        .comment('Add an example data 2')
      ).then(() => {
        console.log('# add data 2')
        //--INSERT INTO test3.object (id, object_type) values (3, 'City');
        DB.query(Q
          .add_triple('doc:Object', 'object_type', 'scm:Object')
          .add_triple('doc:Object', 'id', Q.literal(3, 'integer'))
          .add_triple('doc:Object', 'object_type', Q.literal('City', 'string'))
          .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
          .comment('Add an example data 3')
        ).then(() => {
          console.log('# add data 3')
          //--INSERT INTO test3.object (id, object_type) values (4, 'Person');
          DB.query(Q
            .add_triple('doc:Object', 'object_type', 'scm:Object')
            .add_triple('doc:Object', 'id', Q.literal(4, 'integer'))
            .add_triple('doc:Object', 'object_type', Q.literal('Person', 'string'))
            .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
            .comment('Add an example data 4')
          ).then(() => {
            console.log('# add data 4')
            //--INSERT INTO test3.object (id, object_type) values (5, 'City');
            DB.query(Q
              .add_triple('doc:Object', 'object_type', 'scm:Object')
              .add_triple('doc:Object', 'id', Q.literal(5, 'integer'))
              .add_triple('doc:Object', 'object_type', Q.literal('City', 'string'))
              .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
              .comment('Add an example data 5')
            ).then(() => {
              console.log('# add data 5')
              //--INSERT INTO test3.object (id, object_type) values (6, 'Person');
              DB.query(Q
                .add_triple('doc:Object', 'object_type', 'scm:Object')
                .add_triple('doc:Object', 'id', Q.literal(6, 'integer'))
                .add_triple('doc:Object', 'object_type', Q.literal('Person', 'string'))
                .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
                .comment('Add an example data 6')
              ).then(() => {
                console.log('# add data 6')
                //--INSERT INTO test3.object (id, object_type) values (7, 'Person');
                DB.query(Q
                  .add_triple('doc:Object', 'object_type', 'scm:Object')
                  .add_triple('doc:Object', 'id', Q.literal(7, 'integer'))
                  .add_triple('doc:Object', 'object_type', Q.literal('Person', 'string'))
                  .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
                  .comment('Add an example data 7')
                ).then(() => {
                  console.log('# add data 7')
                  //--INSERT INTO test3.object (id, object_type) values (8, 'Person');
                  DB.query(Q
                    .add_triple('doc:Object', 'object_type', 'scm:Object')
                    .add_triple('doc:Object', 'id', Q.literal(8, 'integer'))
                    .add_triple('doc:Object', 'object_type', Q.literal('Person', 'string'))
                    .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
                    .comment('Add an example data 8')
                  ).then(() => done()
                  ).catch(error => console.log('data 8 error', error))
                }).catch(error => console.log('data 7 error', error))
              }).catch(error => console.log('data 6 error', error))
            }).catch(error => console.log('data 5 error', error))
          }).catch(error => console.log('data 4 error', error))
        }).catch(error => console.log('data 3 error', error))
      }).catch(error => console.log('data 2 error', error))
    }).catch(error => console.log('data 1 error', error))
  }).catch(error => console.log('data 0 error', error))
}

const done = () => {
  console.log('# done')
}
