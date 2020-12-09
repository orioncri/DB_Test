/**
 * http://usejsdoc.org/
 */
//Require TerminusDB Client
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
  console.log('# Checking CRT_Database')
  // use system database for this query
  WOQL.db('_system')
  // check if a database with the label CRT_Database exists
  WOQL.query(Q
      .triple('v:WOQL', 'type', 'system:Database')
      .triple('v:WOQL', 'label', 'v:Label')
      .eq({ '@language': 'en', '@value': 'CRT_Database' }, 'v:Label')
  ).then(response => {
    if (response.bindings.length === 0) {
      console.log('# Creating CRT_Database')
      // create the database
      WOQL.createDatabase('CRT_Database', {
        label: 'CRT_Database',
        comment: 'DB for CRT_Database backend',
        schema: true
      }, 'admin')
      .then(() => {
        hasCRTSchema()
      })
    } else {
      console.log('# CRT_Database Already Created')
//RER      checkoutMain()
//RER      addRevision0()
//RER      addRevision1()
//RER      createBranch_3_5()
//RER      addRevision2()
//RER      createBranch_6_8()
      checkoutBranch_3_5()
//RER      addRevision3()
//RER      addRevision4()
//RER      addRevision5()
//RER      checkoutBranch_6_8()
//RER      addRevision6()
      addRevision7()
    }
  }).catch(error => console.log('error', error))
}

// check for Object Schema, add if missing
const hasCRTSchema = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    if (response.bindings.length === 0) {
      console.log('# Creating Object Schema')
      // add the Schema for class 'scm:Object'
      WOQL.query(Q
          .doctype('Object').label('Object')
          .description('An Object is either a City, Person or Null')
          .property('id', 'xsd:integer').label("Id").cardinality(1)
          .property("object_type", "xsd:string").label("Objct Type")
      ).then(response => {
        console.log('# Created Object Schema')
        // add the Schema for class 'scm:Object'
        console.log('# Creating City Schema')
        WOQL.query(Q
//RER            .doctype("City").label("City").parent('Object')
            .doctype("City").label("City")
            .description('An Object of type City')
            .property('cid', 'xsd:integer').label("Cid").cardinality(1)
            .property("c_object_id", "xsd:integer").label("City Object Id").cardinality(1)
        ).then(response => {
          console.log('# Created City Schema')
          // add the Schema for class 'scm:Person'
          console.log('# Creating Person Schema')
          WOQL.query(Q
//RER              .doctype("Person").label("Person").parent('Object')
              .doctype("Person").label("Person")
              .description('An Object of type Person')
              .property('pid', 'xsd:integer').label("Pid").cardinality(1)
              .property("p_object_id", "xsd:integer").label("Person Object Id").cardinality(1)
          ).then(response => {
            console.log('# Created Person Schema')
            // add the Schema for class 'scm:CityContent'
            console.log('# Creating City Content Schema')
            WOQL.query(Q
//RER                .doctype("CityContent").label("City Content").parent('Object')
                .doctype("CityContent").label("City Content")
                .description('An Object of type City Content')
                .property('ccid', 'xsd:integer').label("Ccid").cardinality(1)
                .property("cityContent_id", "xsd:integer").label("City Content Id").cardinality(1)
                .property("ccity_id", "xsd:integer").label("City Id").cardinality(1)
                .property("name", "xsd:string").label("City Name")
            ).then(response => {
              console.log('# Created City Content Schema')
              // add the Schema for class 'scm:PersonContent'
              console.log('# Creating Person Content Schema')
              WOQL.query(Q
//RER                  .doctype("PersonContent").label("Person Content").parent('Object')
                  .doctype("PersonContent").label("Person Content")
                  .description('An Object of type Person Content')
                  .property('pcid', 'xsd:integer').label("Pcid").cardinality(1)
                  .property("personContent_id", "xsd:integer").label("Person Content Id").cardinality(1)
                  .property("person_id", "xsd:integer").label("Person Id").cardinality(1)
                  .property("first_name", "xsd:string").label("First Name")
                  .property("last_name", "xsd:string").label("Last Name")
                  .property("age", "xsd:integer").label("Person Age").cardinality(1)
                  .property("pcity_id", "xsd:integer").label("City Id").cardinality(1)
              ).then(() => {
                console.log('# Created Person Content Schema')
                console.log('# CRT Schema Created')
                done()
              }).catch(error => console.log('add Person Content Data error', error))
            }).catch(error => console.log('add City Content Data error', error))
          }).catch(error => console.log('add Person Data error', error))
        }).catch(error => console.log('add City Data error', error))
      }).catch(error => console.log('add Object Data error', error))
    } else {
      console.log('# Object Schema already Created')
      done()
    }
  })
  .catch(error => console.log('error', error))
}

//Checking out branch main
const checkoutMain = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Checkout Branch main')
  let branchName="main"
  WOQL.checkout(branchName)
}

//Create branch_3_5 main
const createBranch_3_5 = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Create branch_3_5')
  let branchName="branch_3_5"
  WOQL.branch(branchName).then(() => {
      console.log('# Created branch_3_5')
  }).catch(error => console.log('Create branch_3_5 error', error))
}

//Create branch_6_8 main
const createBranch_6_8 = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Create branch_6_8')
  let branchName="branch_6_8"
  WOQL.branch(branchName).then(() => {
      console.log('# Created branch_6_8')
  }).catch(error => console.log('Create branch_6_8 error', error))
}

//Checking out branch main
const checkoutBranch_3_5 = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Checkout Branch branch_3_5')
  let branchName="branch_3_5"
  WOQL.checkout(branchName)
}

//Checking out branch main
const checkoutBranch_6_8 = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Checkout Branch branch_6_8')
  let branchName="branch_6_8"
  WOQL.checkout(branchName)
}

//Add Revision 0 Data
const addRevision0 = () => {
  console.log('# Checking Object Schema')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# Add Revision 0 A1')
    WOQL.query(Q
        .add_triple('doc:object1', 'type', 'scm:Object')
        .add_triple('doc:object1', 'id', Q.literal(0, 'xsd:integer'))
        .add_triple('doc:object1', 'object_type', Q.literal('', 'xsd:string'))
        .comment('Add Revision 0 A1')
    ).then(() => {
        console.log('# Added Revision 0 A1')
    }).catch(error => console.log('Object Revision 0 A1 error', error))
  }).catch(error => console.log('Object Schema error', error))
}

//Add Revision 1 Data
const addRevision1 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# Add Object Revision 1 A2')
    WOQL.query(Q
            .add_triple('doc:object2', 'type', 'scm:Object')
            .add_triple('doc:object2', 'id', Q.literal(1, 'xsd:integer'))
            .add_triple('doc:object2', 'object_type', Q.literal('City', 'xsd:string'))
        .comment('Add Object Revision 1 A2')
    ).then(() => {
        console.log('# Added Object Revision 1 A2')
        console.log('# Add Object Revision 1 A3')
        WOQL.query(Q
            .add_triple('doc:object3', 'type', 'scm:Object')
            .add_triple('doc:object3', 'id', Q.literal(2, 'xsd:integer'))
            .add_triple('doc:object3', 'object_type', Q.literal('Person', 'xsd:string'))
            .comment('Add Object Revision 1 A3')
        ).then(() => {
          console.log('# Added Object Revision 1 A3')
        }).catch(error => console.log('Add Object Revision A2 error', error))
    }).catch(error => console.log('Add Object Revision A1 error', error))
  }).catch(error => console.log('Object Schema error', error))
  
  console.log('# Checking City Schema')
  // check if a class called 'scm:City' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:City')
  )
  .then(response => {
    console.log('# Add City Revision 1 A2')

    WOQL.query(Q
        .add_triple('doc:city1', 'type', 'scm:City')
        .add_triple('doc:city1', 'cid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:city1', 'c_object_id', Q.literal(1, 'xsd:integer'))
        .comment('Add City Revision 1 A2')
    ).then(() => {
      console.log('# Added City Revision 1 A2')
    }).catch(error => console.log('City Revision 1 A2 error', error))
  }).catch(error => console.log('Add City Schema error', error))
  
  console.log('# Checking CityContent Schema')
  // check if a class called 'scm:CityContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:CityContent')
  )
  .then(response => {
    console.log('# Add CityContent Revision 1 A2')
    WOQL.query(Q
        .add_triple('doc:cityContent1', 'type', 'scm:CityContent')
        .add_triple('doc:cityContent1', 'ccid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:cityContent1', 'cityContent_id', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:cityContent1', 'ccity_id', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:cityContent1', 'name', Q.literal('fort worth', 'xsd:string'))
        .comment('Add CityContent Revision 1 A2')
    ).then(() => {
        console.log('# Added CityContent Revision 1 A2')
    }).catch(error => console.log('Add CityContent Revision 1 A2 error', error))
  }).catch(error => console.log('CityContent Schema error', error))
  
  console.log('# Checking Person Schema')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Person')
  )
  .then(response => {
    console.log('# Add Person Revision 1 A3')
    WOQL.query(Q
        .add_triple('doc:person1', 'type', 'scm:Person')
        .add_triple('doc:person1', 'pid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:person1', 'p_object_id', Q.literal(2, 'xsd:integer'))
        .comment('Add Person Revision 1 A3')
    ).then(() => {
      console.log('# Added Person Revision 1 A3')
    }).catch(error => console.log('Add Person Revision 1 A3 error', error))
  }).catch(error => console.log('Person Schema error', error))
  console.log('# Checking PersonContent Schema')
  
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Add PersonContent Revision 1 A3')
    WOQL.query(Q
        .add_triple('doc:personContent1', 'type', 'scm:PersonContent')
        .add_triple('doc:personContent1', 'pcid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:personContent1', 'personContent_id', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:personContent1', 'person_id', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:personContent1', 'first_name', Q.literal('Duane', 'xsd:string'))
        .add_triple('doc:personContent1', 'last_name', Q.literal('Knesek', 'xsd:string'))
        .add_triple('doc:personContent1', 'age', Q.literal(21, 'xsd:integer'))
        .add_triple('doc:personContent1', 'pcity_id', Q.literal(1, 'xsd:integer'))
        .comment('Add PersonContent Revision 1 A3')
    ).then(() => {
      console.log('# Added PersonContent Revision 1 A3')
    }).catch(error => console.log('Add PersonContent Revision 1 A3 error', error))
  }).catch(error => console.log('PersonContent error', error))
}

//Add Revision 2 Data
const addRevision2 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# Add Object Revision 2 A4')
    WOQL.query(Q
            .add_triple('doc:object4', 'type', 'scm:Object')
            .add_triple('doc:object4', 'id', Q.literal(3, 'xsd:integer'))
            .add_triple('doc:object4', 'object_type', Q.literal('City', 'xsd:string'))
        .comment('Add Object Revision 2 A4')
    ).then(() => {
        console.log('# Added Object Revision 2 A4')
        console.log('# Add Object Revision 2 A5')
        WOQL.query(Q
            .add_triple('doc:object5', 'type', 'scm:Object')
            .add_triple('doc:object5', 'id', Q.literal(4, 'xsd:integer'))
            .add_triple('doc:object5', 'object_type', Q.literal('Person', 'xsd:string'))
            .comment('Add Object Revision 2 A5')
        ).then(() => {
          console.log('# Added Object Revision 2 A5')
        }).catch(error => console.log('Add Object Revision 2 A5 error', error))
    }).catch(error => console.log('Add Object Revision 2 A4 error', error))
  }).catch(error => console.log('Object Schema error', error))
  
  console.log('# Checking City Schema')
  // check if a class called 'scm:City' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:City')
  )
  .then(response => {
    console.log('# Add City Revision 2 A4')

    WOQL.query(Q
        .add_triple('doc:city2', 'type', 'scm:City')
        .add_triple('doc:city2', 'cid', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:city2', 'c_object_id', Q.literal(3, 'xsd:integer'))
        .comment('Add City Revision 2 A4')
    ).then(() => {
      console.log('# Added City Revision 2 A4')
    }).catch(error => console.log('City Revision 2 A4 error', error))
  }).catch(error => console.log('Add City Schema error', error))
  
  console.log('# Checking CityContent Schema')
  // check if a class called 'scm:CityContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:CityContent')
  )
  .then(response => {
    console.log('# Add CityContent Revision 2 A4')
    WOQL.query(Q
        .add_triple('doc:cityContent2', 'type', 'scm:CityContent')
        .add_triple('doc:cityContent2', 'ccid', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:cityContent2', 'cityContent_id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:cityContent2', 'ccity_id', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:cityContent2', 'name', Q.literal('Dallas', 'xsd:string'))
        .comment('Add CityContent Revision 2 A4')
    ).then(() => {
        console.log('# Added CityContent Revision 2 A4')
    }).catch(error => console.log('Add CityContent Revision 2 A4 error', error))
  }).catch(error => console.log('CityContent Schema error', error))
  
  console.log('# Checking Person Schema')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Person')
  )
  .then(response => {
    console.log('# Add Person Revision 2 A5')
    WOQL.query(Q
        .add_triple('doc:person2', 'type', 'scm:Person')
        .add_triple('doc:person2', 'pid', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:person2', 'p_object_id', Q.literal(4, 'xsd:integer'))
        .comment('Add Person Revision 2 A5')
    ).then(() => {
      console.log('# Added Person Revision 2 A5')
    }).catch(error => console.log('Add Person Revision 2 A5 error', error))
  }).catch(error => console.log('Person Schema error', error))
  console.log('# Checking PersonContent Schema')
  
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Add PersonContent Revision 2 A5')
    WOQL.query(Q
        .add_triple('doc:personContent2', 'type', 'scm:PersonContent')
        .add_triple('doc:personContent2', 'pcid', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:personContent2', 'personContent_id', Q.literal(4, 'xsd:integer'))
        .add_triple('doc:personContent2', 'person_id', Q.literal(4, 'xsd:integer'))
        .add_triple('doc:personContent2', 'first_name', Q.literal('kelley', 'xsd:string'))
        .add_triple('doc:personContent2', 'last_name', Q.literal('hughes', 'xsd:string'))
        .add_triple('doc:personContent2', 'age', Q.literal(21, 'xsd:integer'))
        .add_triple('doc:personContent2', 'pcity_id', Q.literal(3, 'xsd:integer'))
        .comment('Add PersonContent Revision 2 A5')
    ).then(() => {
      console.log('# Added PersonContent Revision 2 A5')
    }).catch(error => console.log('Add PersonContent Revision 2 A5 error', error))
  }).catch(error => console.log('PersonContent error', error))
}

//Add Revision 3 Data
const addRevision3 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# Add Object Revision 3 A6')
    WOQL.query(Q
            .add_triple('doc:object4', 'type', 'scm:Object')
            .add_triple('doc:object4', 'id', Q.literal(5, 'xsd:integer'))
            .add_triple('doc:object4', 'object_type', Q.literal('City', 'xsd:string'))
        .comment('Add Object Revision 3 A6')
    ).then(() => {
        console.log('# Added Object Revision 3 A6')
        console.log('# Add Object Revision 3 A7')
        WOQL.query(Q
            .add_triple('doc:object5', 'type', 'scm:Object')
            .add_triple('doc:object5', 'id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:object5', 'object_type', Q.literal('Person', 'xsd:string'))
            .comment('Add Object Revision 3 A7')
        ).then(() => {
          console.log('# Added Object Revision 3 A7')
        }).catch(error => console.log('Add Object Revision 3 A7 error', error))
    }).catch(error => console.log('Add Object Revision 3 A6 error', error))
  }).catch(error => console.log('Object Schema error', error))
  
  console.log('# Checking City Schema')
  // check if a class called 'scm:City' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:City')
  )
  .then(response => {
    console.log('# Add City Revision 3 A6')

    WOQL.query(Q
        .add_triple('doc:city2', 'type', 'scm:City')
        .add_triple('doc:city2', 'cid', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:city2', 'c_object_id', Q.literal(5, 'xsd:integer'))
        .comment('Add City Revision 3 A6')
    ).then(() => {
      console.log('# Added City Revision 3 A6')
    }).catch(error => console.log('City Revision 3 A6 error', error))
  }).catch(error => console.log('Add City Schema error', error))
  
  console.log('# Checking CityContent Schema')
  // check if a class called 'scm:CityContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:CityContent')
  )
  .then(response => {
    console.log('# Add CityContent Revision 3 A6')
    WOQL.query(Q
        .add_triple('doc:cityContent3', 'type', 'scm:CityContent')
        .add_triple('doc:cityContent3', 'ccid', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:cityContent3', 'cityContent_id', Q.literal(5, 'xsd:integer'))
        .add_triple('doc:cityContent3', 'ccity_id', Q.literal(5, 'xsd:integer'))
        .add_triple('doc:cityContent3', 'name', Q.literal('Arlington', 'xsd:string'))
        .comment('Add CityContent Revision 3 A6')
    ).then(() => {
        console.log('# Added CityContent Revision 3 A6')
    }).catch(error => console.log('Add CityContent Revision 3 A6 error', error))
  }).catch(error => console.log('CityContent Schema error', error))
  
  console.log('# Checking Person Schema')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Person')
  )
  .then(response => {
    console.log('# Add Person Revision 3 A7')
    WOQL.query(Q
        .add_triple('doc:person2', 'type', 'scm:Person')
        .add_triple('doc:person2', 'pid', Q.literal(3, 'xsd:integer'))
        .add_triple('doc:person2', 'p_object_id', Q.literal(6, 'xsd:integer'))
        .comment('Add Person Revision 3 A7')
    ).then(() => {
      console.log('# Added Person Revision 3 A7')
    }).catch(error => console.log('Add Person Revision 3 A7 error', error))
  }).catch(error => console.log('Person Schema error', error))
  console.log('# Checking PersonContent Schema')
  
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Add PersonContent Revision 3 A7')
    WOQL.query(Q
            .add_triple('doc:personContent3', 'type', 'scm:PersonContent')
            .add_triple('doc:personContent3', 'pcid', Q.literal(3, 'xsd:integer'))
            .add_triple('doc:personContent3', 'personContent_id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:personContent3', 'person_id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:personContent3', 'first_name', Q.literal('Michaela', 'xsd:string'))
            .add_triple('doc:personContent3', 'last_name', Q.literal('Kidd', 'xsd:string'))
            .add_triple('doc:personContent3', 'age', Q.literal(21, 'xsd:integer'))
            .add_triple('doc:personContent3', 'pcity_id', Q.literal(5, 'xsd:integer'))
       .comment('Add PersonContent Revision 3 A7')
    ).then(() => {
      console.log('# Added PersonContent Revision 3 A7')
    }).catch(error => console.log('Add PersonContent Revision 3 A7 error', error))
  }).catch(error => console.log('PersonContent error', error))
}

//Add Revision 4 Data
const addRevision4 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# Add Object Revision 4 A8')
    WOQL.query(Q
            .add_triple('doc:object6', 'type', 'scm:Object')
            .add_triple('doc:object6', 'id', Q.literal(5, 'xsd:integer'))
            .add_triple('doc:object6', 'object_type', Q.literal('Person', 'xsd:string'))
        .comment('Add Object Revision 4 A8')
    ).then(() => {
        console.log('# Added Object Revision 4 A8')
    }).catch(error => console.log('Add Object Revision 4 A8 error', error))
  }).catch(error => console.log('Object Schema error', error))
  
  console.log('# Checking Person Schema')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Person')
  )
  .then(response => {
    console.log('# Add Person Revision 4 A8')
    WOQL.query(Q
        .add_triple('doc:person3', 'type', 'scm:Person')
        .add_triple('doc:person3', 'pid', Q.literal(4, 'xsd:integer'))
        .add_triple('doc:person3', 'p_object_id', Q.literal(7, 'xsd:integer'))
        .comment('Add Person Revision 4 A8')
    ).then(() => {
      console.log('# Added Person Revision 4 A8')
    }).catch(error => console.log('Add Person Revision 4 C1 error', error))
  }).catch(error => console.log('Person Schema error', error))
  console.log('# Checking PersonContent Schema')
  
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Add PersonContent Revision 4 A8')
    WOQL.query(Q
        .add_triple('doc:personContent4', 'type', 'scm:PersonContent')
        .add_triple('doc:personContent4', 'pcid', Q.literal(4, 'xsd:integer'))
        .add_triple('doc:personContent4', 'personContent_id', Q.literal(7, 'xsd:integer'))
        .add_triple('doc:personContent4', 'person_id', Q.literal(7, 'xsd:integer'))
        .add_triple('doc:personContent4', 'first_name', Q.literal('Luis', 'xsd:string'))
        .add_triple('doc:personContent4', 'last_name', Q.literal('Marrufo', 'xsd:string'))
        .add_triple('doc:personContent4', 'age', Q.literal(22, 'xsd:integer'))
        .add_triple('doc:personContent4', 'pcity_id', Q.literal(1, 'xsd:integer'))
        .comment('Add PersonContent Revision 4 A8')
    ).then(() => {
      console.log('# Added PersonContent Revision 4 A8')
    }).catch(error => console.log('Add PersonContent Revision 4 A8 error', error))
  }).catch(error => console.log('PersonContent error', error))

  // TODO - NEED TO HAVE AN UPDATE FOR THIS CHANGE
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Change PersonContent Revision 4 C1')
    WOQL.query(Q
        .update_triple('doc:personContent2', 'first_name', Q.literal('Kelley', 'xsd:string'))
        .comment('Change PersonContent Revision 4 C1')
    ).then(() => {
      console.log('# Changed PersonContent Revision 4 C1')
    }).catch(error => console.log('Change PersonContent Revision 4 C1 error', error))
  }).catch(error => console.log('PersonContent error', error))
}

//Add Revision 5 Data
const addRevision5 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  
  console.log('# Checking CityContent Schema')
  // check if a class called 'scm:CityContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:CityContent')
  )
  .then(response => {
    console.log('# Add CityContent Revision 5 C2')
    WOQL.query(Q
        .update_triple('doc:cityContent1', 'name', Q.literal('Fort worth', 'xsd:string'))
        .comment('Add CityContent Revision 5 C2')
    ).then(() => {
        console.log('# Added CityContent Revision 5 C2')
    }).catch(error => console.log('Add CityContent Revision 5 C2 error', error))
  }).catch(error => console.log('CityContent Schema error', error))

  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Change PersonContent Revision 5 C3')
    WOQL.query(Q
        .update_triple('doc:personContent2', 'last_name', Q.literal('Hughes', 'xsd:string'))
        .comment('Change PersonContent Revision 5 C3')
    ).then(() => {
      console.log('# Changed PersonContent Revision 5 C3')
    }).catch(error => console.log('Change PersonContent Revision 5 C3 error', error))
  }).catch(error => console.log('PersonContent error', error))
}

//Add Revision 6 Data
const addRevision6 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  
    WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# Add Object Revision 6 A9')
    WOQL.query(Q
            .add_triple('doc:object7', 'type', 'scm:Object')
            .add_triple('doc:object7', 'id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:object7', 'object_type', Q.literal('Person', 'xsd:string'))
        .comment('Add Object Revision 6 A9')
    ).then(() => {
        console.log('# Added Object Revision 6 A9')
    }).catch(error => console.log('Add Object Revision 6 A9 error', error))
  }).catch(error => console.log('Object Schema error', error))
  
  console.log('# Checking Person Schema')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Person')
  )
  .then(response => {
    console.log('# Add Person Revision 6 A9')
    WOQL.query(Q
        .add_triple('doc:person5', 'type', 'scm:Person')
        .add_triple('doc:person5', 'pid', Q.literal(5, 'xsd:integer'))
        .add_triple('doc:person5', 'p_object_id', Q.literal(8, 'xsd:integer'))
        .comment('Add Person Revision 6 A9')
    ).then(() => {
      console.log('# Added Person Revision 6 A9')
    }).catch(error => console.log('Add Person Revision 4 C1 error', error))
  }).catch(error => console.log('Person Schema error', error))
  console.log('# Checking PersonContent Schema')
  
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# Add PersonContent Revision 6 A9')
    WOQL.query(Q
        .add_triple('doc:personContent5', 'type', 'scm:PersonContent')
        .add_triple('doc:personContent5', 'pcid', Q.literal(7, 'xsd:integer'))
        .add_triple('doc:personContent5', 'personContent_id', Q.literal(11, 'xsd:integer'))
        .add_triple('doc:personContent5', 'person_id', Q.literal(8, 'xsd:integer'))
        .add_triple('doc:personContent5', 'first_name', Q.literal('JD', 'xsd:string'))
        .add_triple('doc:personContent5', 'last_name', Q.literal('Bone', 'xsd:string'))
        .add_triple('doc:personContent5', 'age', Q.literal(22, 'xsd:integer'))
        .add_triple('doc:personContent5', 'pcity_id', Q.literal(1, 'xsd:integer'))
        .comment('Add PersonContent Revision 6 A9')
    ).then(() => {
      console.log('# Added PersonContent Revision 6 A9')
    }).catch(error => console.log('Add PersonContent Revision 6 A9 error', error))
  }).catch(error => console.log('PersonContent error', error))
  
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
	  .quad('v:Class', 'type', 'owl:Class', 'schema')
	  .sub('system:Document', 'v:Class')
	  .eq('v:Class', 'scm:CityContent')
	  )
	  .then(response => {
	    console.log('# Add CityContent Revision 6 C4')
	    WOQL.query(Q
		    .delete_triple('doc:cityContent1', 'name', 'Name')
	        .add_triple('doc:cityContent1', 'name', Q.literal('fort Worth', 'xsd:string'))
	        .comment('Add CityContent Revision 6 C4')
	    ).then(() => {
	        console.log('# Added CityContent Revision 6 C4')
	    }).catch(error => console.log('Add CityContent Revision 6 C4 error', error))
	  }).catch(error => console.log('CityContent Schema error', error))
}

//Add Revision 7 Data
const addRevision7 = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Merge branch_3_5 into Main')
  let branchName="branch_3_5"
  let branchMain="Main"
  WOQL.merge(branchName, branchMain).then(() => {
      console.log('# Merged branch_3_5 into Main')
  }).catch(error => console.log('Merged branch_3_5 into Main error', error))
}

// Create some Object Object's
const addObjectData = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Object')
  )
  .then(response => {
    console.log('# add object1 data 0')
    WOQL.query(Q
        .add_triple('doc:object1', 'type', 'scm:Object')
        .add_triple('doc:object1', 'id', Q.literal(0, 'xsd:integer'))
        .add_triple('doc:object1', 'object_type', Q.literal('', 'xsd:string'))
        .comment('Add an Object data 0')
    ).then(() => {
      console.log('# add object2 data 1')
      WOQL.query(Q
          .add_triple('doc:object2', 'type', 'scm:Object')
          .add_triple('doc:object2', 'id', Q.literal(1, 'xsd:integer'))
          .add_triple('doc:object2', 'object_type', Q.literal('City', 'xsd:string'))
          .comment('Add an Object data 1')
      ).then(() => {
        console.log('# add object3 data 2')
        WOQL.query(Q
            .add_triple('doc:object3', 'type', 'scm:Object')
            .add_triple('doc:object3', 'id', Q.literal(2, 'xsd:integer'))
            .add_triple('doc:object3', 'object_type', Q.literal('Person', 'xsd:string'))
            .comment('Add an Object data 2')
        ).then(() => {
          console.log('# add object4 data 3')
          WOQL.query(Q
              .add_triple('doc:object4', 'type', 'scm:Object')
              .add_triple('doc:object4', 'id', Q.literal(3, 'xsd:integer'))
              .add_triple('doc:object4', 'object_type', Q.literal('City', 'xsd:string'))
              .comment('Add an Object data 3')
          ).then(() => {
            console.log('# add object5 data 4')
            WOQL.query(Q
                .add_triple('doc:object5', 'type', 'scm:Object')
                .add_triple('doc:object5', 'id', Q.literal(4, 'xsd:integer'))
                .add_triple('doc:object5', 'object_type', Q.literal('Person', 'xsd:string'))
                .comment('Add an Object data 4')
            ).then(() => {
              console.log('# add object6 data 5')
              WOQL.query(Q
                  .add_triple('doc:object6', 'type', 'scm:Object')
                  .add_triple('doc:object6', 'id', Q.literal(5, 'xsd:integer'))
                  .add_triple('doc:object6', 'object_type', Q.literal('City', 'xsd:string'))
                  .comment('Add an Object data 5')
              ).then(() => {
                console.log('# add object7 data 6')
                WOQL.query(Q
                    .add_triple('doc:object7', 'type', 'scm:Object')
                    .add_triple('doc:object7', 'id', Q.literal(6, 'xsd:integer'))
                    .add_triple('doc:object7', 'object_type', Q.literal('Person', 'xsd:string'))
                    .comment('Add an Object data 6')
                ).then(() => {
                  console.log('# add object8 data 7')
                  WOQL.query(Q
                      .add_triple('doc:object8', 'type', 'scm:Object')
                      .add_triple('doc:object8', 'id', Q.literal(7, 'xsd:integer'))
                      .add_triple('doc:object8', 'object_type', Q.literal('Person', 'xsd:string'))
                      .comment('Add an Object data 7')
                  ).then(() => {
                    console.log('# add object9 data 8')
                    WOQL.query(Q
                        .add_triple('doc:object9', 'type', 'scm:Object')
                        .add_triple('doc:object9', 'id', Q.literal(8, 'xsd:integer'))
                        .add_triple('doc:object9', 'object_type', Q.literal('Person', 'xsd:string'))
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
  }).catch(error => console.log('Object Schema error', error))
}

// Create some City Object's
const addCityData = () => {
  console.log('# Checking City Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
// RER      .sub('scm:Object', 'v:Class')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:City')
  )
  .then(response => {
    console.log('# add city1 data 0')

    WOQL.query(Q
        .add_triple('doc:city1', 'type', 'scm:City')
        .add_triple('doc:city1', 'cid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:city1', 'c_object_id', Q.literal(1, 'xsd:integer'))
        .comment('Add an City data 0')
    ).then(() => {
      console.log('# add city2 data 1')
      WOQL.query(Q
          .add_triple('doc:city2', 'type', 'scm:City')
          .add_triple('doc:city2', 'cid', Q.literal(2, 'xsd:integer'))
          .add_triple('doc:city2', 'c_object_id', Q.literal(3, 'xsd:integer'))
          .comment('Add an City data 1')
      ).then(() => {
        console.log('# add city3 data 2')
        WOQL.query(Q
            .add_triple('doc:city3', 'type', 'scm:City')
            .add_triple('doc:city3', 'cid', Q.literal(3, 'xsd:integer'))
            .add_triple('doc:city3', 'c_object_id', Q.literal(5, 'xsd:integer'))
            .comment('Add an City data 2')
        ).then(() => {
        }).catch(error => console.log('City Data 2 error', error))
      }).catch(error => console.log('City Data 1 error', error))
    }).catch(error => console.log('City Data 0 error', error))
  }).catch(error => console.log('City Schema error', error))
}

// Create some Person Object's
const addPersonData = () => {
  console.log('# Checking Person Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:Person')
  )
  .then(response => {
    console.log('# add person1 data 0')
    WOQL.query(Q
        .add_triple('doc:person1', 'type', 'scm:Person')
        .add_triple('doc:person1', 'pid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:person1', 'p_object_id', Q.literal(2, 'xsd:integer'))
        .comment('Add an Person data 0')
    ).then(() => {
      console.log('# add person2 data 1')
      WOQL.query(Q
          .add_triple('doc:person2', 'type', 'scm:Person')
          .add_triple('doc:person2', 'pid', Q.literal(2, 'xsd:integer'))
          .add_triple('doc:person2', 'p_object_id', Q.literal(4, 'xsd:integer'))
          .comment('Add an Person data 1')
      ).then(() => {
        console.log('# add person3 data 2')
        WOQL.query(Q
            .add_triple('doc:person3', 'type', 'scm:Person')
            .add_triple('doc:person3', 'pid', Q.literal(3, 'xsd:integer'))
            .add_triple('doc:person3', 'p_object_id', Q.literal(6, 'xsd:integer'))
            .comment('Add an Person data 2')
        ).then(() => {
          console.log('# add person4 data 3')
          WOQL.query(Q
              .add_triple('doc:person4', 'type', 'scm:Person')
              .add_triple('doc:person4', 'pid', Q.literal(4, 'xsd:integer'))
              .add_triple('doc:person4', 'p_object_id', Q.literal(7, 'xsd:integer'))
              .comment('Add an Person data 4')
          ).then(() => {
            console.log('# add person5 data 4')
            WOQL.query(Q
                .add_triple('doc:person5', 'type', 'scm:Person')
                .add_triple('doc:person5', 'pid', Q.literal(5, 'xsd:integer'))
                .add_triple('doc:person5', 'p_object_id', Q.literal(8, 'xsd:integer'))
                .comment('Add an Person data 4')
            ).then(() => {
            }).catch(error => console.log('Person Data 4 error', error))
          }).catch(error => console.log('Person Data 3 error', error))
        }).catch(error => console.log('Person Data 2 error', error))
      }).catch(error => console.log('Person Data 1 error', error))
    }).catch(error => console.log('Person Data 0 error', error))
  }).catch(error => console.log('Person Schema error', error))
}

//Create some CityContent Object's
const addCityContentData = () => {
  console.log('# Checking CityContent Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:Object' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:CityContent')
  )
  .then(response => {
    console.log('# add cityContent1 data 0')
    WOQL.query(Q
        .add_triple('doc:cityContent1', 'type', 'scm:CityContent')
        .add_triple('doc:cityContent1', 'ccid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:cityContent1', 'cityContent_id', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:cityContent1', 'ccity_id', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:cityContent1', 'name', Q.literal('Fort Worth', 'xsd:string'))
        .comment('Add an CityContent data 0')
    ).then(() => {
      console.log('# add cityContent2 data 1')
      WOQL.query(Q
          .add_triple('doc:cityContent2', 'type', 'scm:CityContent')
          .add_triple('doc:cityContent2', 'ccid', Q.literal(2, 'xsd:integer'))
          .add_triple('doc:cityContent2', 'cityContent_id', Q.literal(3, 'xsd:integer'))
          .add_triple('doc:cityContent2', 'ccity_id', Q.literal(3, 'xsd:integer'))
          .add_triple('doc:cityContent2', 'name', Q.literal('Dallas', 'xsd:string'))
          .comment('Add an CityContent data 1')
      ).then(() => {
        console.log('# add cityContent3 data 2')
        WOQL.query(Q
            .add_triple('doc:cityContent3', 'type', 'scm:CityContent')
            .add_triple('doc:cityContent3', 'ccid', Q.literal(3, 'xsd:integer'))
            .add_triple('doc:cityContent3', 'cityContent_id', Q.literal(5, 'xsd:integer'))
            .add_triple('doc:cityContent3', 'ccity_id', Q.literal(5, 'xsd:integer'))
            .add_triple('doc:cityContent3', 'name', Q.literal('Arlington', 'xsd:string'))
            .comment('Add an CityContent data 2')
        ).then(() => {
          console.log('# add cityContent4 data 3')
          WOQL.query(Q
              .add_triple('doc:cityContent4', 'type', 'scm:CityContent')
              .add_triple('doc:cityContent4', 'ccid', Q.literal(4, 'xsd:integer'))
              .add_triple('doc:cityContent4', 'cityContent_id', Q.literal(9, 'xsd:integer'))
              .add_triple('doc:cityContent4', 'ccity_id', Q.literal(1, 'xsd:integer'))
              .add_triple('doc:cityContent4', 'name', Q.literal('Fort Worth', 'xsd:string'))
              .comment('Add an CityContent data 3')
          ).then(() => {
            console.log('# add cityContent5 data 4')
            WOQL.query(Q
                .add_triple('doc:cityContent5', 'type', 'scm:CityContent')
                .add_triple('doc:cityContent5', 'ccid', Q.literal(5, 'xsd:integer'))
                .add_triple('doc:cityContent5', 'cityContent_id', Q.literal(12, 'xsd:integer'))
                .add_triple('doc:cityContent5', 'ccity_id', Q.literal(1, 'xsd:integer'))
                .add_triple('doc:cityContent5', 'name', Q.literal('Fort Worth', 'xsd:string'))
                .comment('Add an CityContent data 4')
            ).then(() => {
              console.log('# add cityContent6 data 5')
              WOQL.query(Q
                  .add_triple('doc:cityContent6', 'type', 'scm:CityContent')
                  .add_triple('doc:cityContent6', 'ccid', Q.literal(6, 'xsd:integer'))
                  .add_triple('doc:cityContent6', 'cityContent_id', Q.literal(15, 'xsd:integer'))
                  .add_triple('doc:cityContent6', 'ccity_id', Q.literal(1, 'xsd:integer'))
                  .add_triple('doc:cityContent6', 'name', Q.literal('Fort Worth', 'xsd:string'))
                  .comment('Add an CityContent data 5')
              ).then(() => {
                console.log('# add cityContent7 data 6')
                WOQL.query(Q
                    .add_triple('doc:cityContent7', 'type', 'scm:CityContent')
                    .add_triple('doc:cityContent7', 'ccid', Q.literal(7, 'xsd:integer'))
                    .add_triple('doc:cityContent7', 'cityContent_id', Q.literal(16, 'xsd:integer'))
                    .add_triple('doc:cityContent7', 'ccity_id', Q.literal(3, 'xsd:integer'))
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
  }).catch(error => console.log('CityContent Schema error', error))
}

// Create some PersonContent Object's
const addPersonContentData = () => {
  console.log('# Checking PersonContent Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  // check if a class called 'scm:PersonContent' exists
  // and is a sub of class 'system:Document'
  WOQL.query(Q
      .quad('v:Class', 'type', 'owl:Class', 'schema')
      .sub('system:Document', 'v:Class')
      .eq('v:Class', 'scm:PersonContent')
  )
  .then(response => {
    console.log('# add personContent1 data 0')
    WOQL.query(Q
        .add_triple('doc:personContent1', 'type', 'scm:PersonContent')
        .add_triple('doc:personContent1', 'pcid', Q.literal(1, 'xsd:integer'))
        .add_triple('doc:personContent1', 'personContent_id', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:personContent1', 'person_id', Q.literal(2, 'xsd:integer'))
        .add_triple('doc:personContent1', 'first_name', Q.literal('Duane', 'xsd:string'))
        .add_triple('doc:personContent1', 'last_name', Q.literal('Knesek', 'xsd:string'))
        .add_triple('doc:personContent1', 'age', Q.literal(21, 'xsd:integer'))
        .add_triple('doc:personContent1', 'pcity_id', Q.literal(1, 'xsd:integer'))
        .comment('Add an PersonContent data 0')
    ).then(() => {
      console.log('# add personContent2 data 1')
      WOQL.query(Q
          .add_triple('doc:personContent2', 'type', 'scm:PersonContent')
          .add_triple('doc:personContent2', 'pcid', Q.literal(2, 'xsd:integer'))
          .add_triple('doc:personContent2', 'personContent_id', Q.literal(4, 'xsd:integer'))
          .add_triple('doc:personContent2', 'person_id', Q.literal(4, 'xsd:integer'))
          .add_triple('doc:personContent2', 'first_name', Q.literal('kelley', 'xsd:string'))
          .add_triple('doc:personContent2', 'last_name', Q.literal('Hughes', 'xsd:string'))
          .add_triple('doc:personContent2', 'age', Q.literal(21, 'xsd:integer'))
          .add_triple('doc:personContent2', 'pcity_id', Q.literal(3, 'xsd:integer'))
          .comment('Add an PersonContent data 1')
      ).then(() => {
        console.log('# add personContent3 data 2')
        WOQL.query(Q
            .add_triple('doc:personContent3', 'type', 'scm:PersonContent')
            .add_triple('doc:personContent3', 'pcid', Q.literal(3, 'xsd:integer'))
            .add_triple('doc:personContent3', 'personContent_id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:personContent3', 'person_id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:personContent3', 'first_name', Q.literal('Michaela', 'xsd:string'))
            .add_triple('doc:personContent3', 'last_name', Q.literal('Kidd', 'xsd:string'))
            .add_triple('doc:personContent3', 'age', Q.literal(21, 'xsd:integer'))
            .add_triple('doc:personContent3', 'pcity_id', Q.literal(5, 'xsd:integer'))
            .comment('Add an PersonContent data 2')
        ).then(() => {
          console.log('# add personContent4 data 3')
          WOQL.query(Q
              .add_triple('doc:personContent4', 'type', 'scm:PersonContent')
              .add_triple('doc:personContent4', 'pcid', Q.literal(4, 'xsd:integer'))
              .add_triple('doc:personContent4', 'personContent_id', Q.literal(7, 'xsd:integer'))
              .add_triple('doc:personContent4', 'person_id', Q.literal(7, 'xsd:integer'))
              .add_triple('doc:personContent4', 'first_name', Q.literal('Luis', 'xsd:string'))
              .add_triple('doc:personContent4', 'last_name', Q.literal('Marrufo', 'xsd:string'))
              .add_triple('doc:personContent4', 'age', Q.literal(22, 'xsd:integer'))
              .add_triple('doc:personContent4', 'pcity_id', Q.literal(1, 'xsd:integer'))
              .comment('Add an PersonContent data 3')
          ).then(() => {
            console.log('# add personContent5 data 4')
            WOQL.query(Q
                .add_triple('doc:personContent5', 'type', 'scm:PersonContent')
                .add_triple('doc:personContent5', 'pcid', Q.literal(5, 'xsd:integer'))
                .add_triple('doc:personContent5', 'personContent_id', Q.literal(8, 'xsd:integer'))
                .add_triple('doc:personContent5', 'person_id', Q.literal(4, 'xsd:integer'))
                .add_triple('doc:personContent5', 'first_name', Q.literal('Kelley', 'xsd:string'))
                .add_triple('doc:personContent5', 'last_name', Q.literal('Hughes', 'xsd:string'))
                .add_triple('doc:personContent5', 'age', Q.literal(21, 'xsd:integer'))
                .add_triple('doc:personContent5', 'pcity_id', Q.literal(3, 'xsd:integer'))
                .comment('Add an PersonContent data 4')
            ).then(() => {
              console.log('# add personContent6 data 5')
              WOQL.query(Q
                  .add_triple('doc:personContent6', 'type', 'scm:PersonContent')
                  .add_triple('doc:personContent6', 'pcid', Q.literal(6, 'xsd:integer'))
                  .add_triple('doc:personContent6', 'personContent_id', Q.literal(10, 'xsd:integer'))
                  .add_triple('doc:personContent6', 'person_id', Q.literal(4, 'xsd:integer'))
                  .add_triple('doc:personContent6', 'first_name', Q.literal('Kelley', 'xsd:string'))
                  .add_triple('doc:personContent6', 'last_name', Q.literal('Hughes', 'xsd:string'))
                  .add_triple('doc:personContent6', 'age', Q.literal(21, 'xsd:integer'))
                  .add_triple('doc:personContent6', 'pcity_id', Q.literal(3, 'xsd:integer'))
                  .comment('Add an PersonContent data 5')
              ).then(() => {
                console.log('# add personContent7 data 6')
                WOQL.query(Q
                    .add_triple('doc:personContent7', 'type', 'scm:PersonContent')
                    .add_triple('doc:personContent7', 'pcid', Q.literal(7, 'xsd:integer'))
                    .add_triple('doc:personContent7', 'personContent_id', Q.literal(11, 'xsd:integer'))
                    .add_triple('doc:personContent7', 'person_id', Q.literal(8, 'xsd:integer'))
                    .add_triple('doc:personContent7', 'first_name', Q.literal('JD', 'xsd:string'))
                    .add_triple('doc:personContent7', 'last_name', Q.literal('Bone', 'xsd:string'))
                    .add_triple('doc:personContent7', 'age', Q.literal(22, 'xsd:integer'))
                    .add_triple('doc:personContent7', 'pcity_id', Q.literal(1, 'xsd:integer'))
                    .comment('Add an PersonContent data 6')
                ).then(() => {
                  console.log('# add personContent8 data 7')
                  WOQL.query(Q
                      .add_triple('doc:personContent8', 'type', 'scm:PersonContent')
                      .add_triple('doc:personContent8', 'pcid', Q.literal(8, 'xsd:integer'))
                      .add_triple('doc:personContent8', 'personContent_id', Q.literal(13, 'xsd:integer'))
                      .add_triple('doc:personContent8', 'person_id', Q.literal(4, 'xsd:integer'))
                      .add_triple('doc:personContent8', 'first_name', Q.literal('Kelley', 'xsd:string'))
                      .add_triple('doc:personContent8', 'last_name', Q.literal('Hughes', 'xsd:string'))
                      .add_triple('doc:personContent8', 'age', Q.literal(21, 'xsd:integer'))
                      .add_triple('doc:personContent8', 'pcity_id', Q.literal(1, 'xsd:integer'))
                      .comment('Add an PersonContent data 7')
                  ).then(() => {
                    console.log('# add personContent9 data 8')
                    WOQL.query(Q
                        .add_triple('doc:personContent9', 'type', 'scm:PersonContent')
                        .add_triple('doc:personContent9', 'pcid', Q.literal(9, 'xsd:integer'))
                        .add_triple('doc:personContent9', 'personContent_id', Q.literal(14, 'xsd:integer'))
                        .add_triple('doc:personContent9', 'person_id', Q.literal(4, 'xsd:integer'))
                        .add_triple('doc:personContent9', 'first_name', Q.literal('Kelley', 'xsd:string'))
                        .add_triple('doc:personContent9', 'last_name', Q.literal('Hughes', 'xsd:string'))
                        .add_triple('doc:personContent9', 'age', Q.literal(22, 'xsd:integer'))
                        .add_triple('doc:personContent9', 'pcity_id', Q.literal(3, 'xsd:integer'))
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
  }).catch(error => console.log('PersonContent error', error))
}

const done = () => {
  console.log('# Done')
}
