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
        console.log('# creating schema')
        // add the schema for class 'scm:Object'
        WOQL.query(Q
          .doctype('Object')
          .label('Object')
          .description('An Object is either a City, Person or Null')
          .property('id', 'xsd:integer').cardinality(1)
// RER          .property('object_type', 'scm:Object').cardinality(1)
          .property('completed', 'xsd:boolean').cardinality(1)
        ).then(response => {
          addExamples()
        }).catch(error => console.log('error', error))
      } else {
        console.log('# has schema')
        done()
      }
    })
    .catch(error => console.log('error', error))
}

// Create some example Objects
const addExamples = () => {
  console.log('# add object1')
  // add example Object 'Taste TerminusDB'
  // set completed to true
  WOQL.query(Q
    .add_triple('doc:object1', 'type', 'scm:Object')
    .add_triple('doc:object1', 'id', Q.literal(0, 'integer'))
// RER    .add_triple('doc:object1', 'object_type', 'scm:Object')
    .add_triple('doc:object1', 'completed', Q.literal(true, 'boolean'))
      .comment('Add an example object1')
  ).then(() => {
    console.log('# add object2')
    // add example Object 'Buy a camel'
    // set completed to false
    WOQL.query(Q
      .add_triple('doc:object2', 'type', 'scm:Object')
      .add_triple('doc:object2', 'id', Q.literal(1, 'integer'))
// RER      .add_triple('doc:Object', 'object_type', 'scm:Object')
      .add_triple('doc:object2', 'completed', Q.literal(true, 'boolean'))
        .comment('Add an example object2')
    ).then(() => done()
    ).catch(error => console.log('object 2 error', error))
  }).catch(error => console.log('object 1 error', error))
}

const done = () => {
  console.log('# done')
}
