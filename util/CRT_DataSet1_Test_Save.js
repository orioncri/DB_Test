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

      // Select the Revision Test
      var revision = 7
      
      if (revision == 1) {
        checkoutMain()
        addRevision0()
        addRevision1()
      } else if (revision == 11) {
        checkoutMain()
        createBranch_3_5()
      } else if (revision == 2) {
        checkoutMain()
        addRevision2()
      } else if (revision == 22) {
        checkoutMain()
        createBranch_6_8()
      } else if (revision == 3) {
        checkoutBranch_3_5()
        addRevision3()
      } else if (revision == 4) {
        checkoutMain()
        addRevision4()
      } else if (revision == 5) {
        checkoutBranch_3_5()
        addRevision5()
      } else if (revision == 6) {
        checkoutBranch_6_8()
        addRevision6()
      } else if (revision == 7) {
        checkoutMain()
        addRevision7()
      } else if (revision == 8) {
        checkoutBranch_6_8()
        addRevision8()
      } else if (revision == 9) {
        checkoutMain()
        addRevision9()
      } else if (revision == 10) {
        checkoutMain()
        addRevision10()
      }
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
      let commit_msg = 'Created Object Schema'
      console.log('# Creating Object Schema')
      // add the Schema for class 'scm:Object'
      WOQL.query(Q
          .doctype('Object').label('Object')
          .description('An Object is either a City, Person or Null')
          .property('id', 'xsd:integer').label("Id").cardinality(1)
          .property("object_type", "xsd:string").label("Objct Type")
          ,commit_msg
      ).then(response => {
        console.log('# Created Object Schema')
        // add the Schema for class 'scm:Object'
        let commit_msg = 'Created City Schema'
        console.log('# Creating City Schema')
        WOQL.query(Q
//RER            .doctype("City").label("City").parent('Object')
            .doctype("City").label("City")
            .description('An Object of type City')
            .property('cid', 'xsd:integer').label("Cid").cardinality(1)
            .property("c_object_id", "xsd:integer").label("City Object Id").cardinality(1)
            ,commit_msg
        ).then(response => {
          console.log('# Created City Schema')
          // add the Schema for class 'scm:Person'
          let commit_msg = 'Created Person Schema'
          console.log('# Creating Person Schema')
          WOQL.query(Q
//RER              .doctype("Person").label("Person").parent('Object')
              .doctype("Person").label("Person")
              .description('An Object of type Person')
              .property('pid', 'xsd:integer').label("Pid").cardinality(1)
              .property("p_object_id", "xsd:integer").label("Person Object Id").cardinality(1)
              ,commit_msg
          ).then(response => {
            console.log('# Created Person Schema')
            // add the Schema for class 'scm:CityContent'
            let commit_msg = 'Created City Content Schema'
            console.log('# Creating City Content Schema')
            WOQL.query(Q
//RER                .doctype("CityContent").label("City Content").parent('Object')
                .doctype("CityContent").label("City Content")
                .description('An Object of type City Content')
                .property('ccid', 'xsd:integer').label("Ccid").cardinality(1)
                .property("cityContent_id", "xsd:integer").label("City Content Id").cardinality(1)
                .property("ccity_id", "xsd:integer").label("City Id").cardinality(1)
                .property("name", "xsd:string").label("City Name")
                ,commit_msg
            ).then(response => {
              console.log('# Created City Content Schema')
              // add the Schema for class 'scm:PersonContent'
              let commit_msg = 'Created Person Content Schema'
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
                  ,commit_msg
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
        ,'Add Revision 0 A1'
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
            ,'Add Object Revision 1 A2'
    ).then(() => {
        console.log('# Added Object Revision 1 A2')
        console.log('# Add Object Revision 1 A3')
        WOQL.query(Q
            .add_triple('doc:object3', 'type', 'scm:Object')
            .add_triple('doc:object3', 'id', Q.literal(2, 'xsd:integer'))
            .add_triple('doc:object3', 'object_type', Q.literal('Person', 'xsd:string'))
            ,'Add Object Revision 1 A3'
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
        ,'Add City Revision 1 A2'
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
        ,'Add CityContent Revision 1 A2'
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
        ,'Add Person Revision 1 A3'
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
        ,'Add PersonContent Revision 1 A3'
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
            ,'Add Object Revision 2 A4'
    ).then(() => {
        console.log('# Added Object Revision 2 A4')
        console.log('# Add Object Revision 2 A5')
        WOQL.query(Q
            .add_triple('doc:object5', 'type', 'scm:Object')
            .add_triple('doc:object5', 'id', Q.literal(4, 'xsd:integer'))
            .add_triple('doc:object5', 'object_type', Q.literal('Person', 'xsd:string'))
            ,'Add Object Revision 2 A5'
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
        ,'Add City Revision 2 A4'
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
        ,'Add CityContent Revision 2 A4'
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
        ,'Add Person Revision 2 A5'
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
        ,'Add PersonContent Revision 2 A5'
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
            ,'Add Object Revision 3 A6'
    ).then(() => {
        console.log('# Added Object Revision 3 A6')
        console.log('# Add Object Revision 3 A7')
        WOQL.query(Q
            .add_triple('doc:object5', 'type', 'scm:Object')
            .add_triple('doc:object5', 'id', Q.literal(6, 'xsd:integer'))
            .add_triple('doc:object5', 'object_type', Q.literal('Person', 'xsd:string'))
            ,'Add Object Revision 3 A7'
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
        ,'Add City Revision 3 A6'
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
        ,'Add CityContent Revision 3 A6'
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
        ,'Add Person Revision 3 A7'
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
            ,'Add PersonContent Revision 3 A7'
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
            ,'Add Object Revision 4 A8'
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
        ,'Add Person Revision 4 A8'
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
        ,'Add PersonContent Revision 4 A8'
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
        .delete_triple('doc:personContent2', 'first_name', 'v:First Name')
        .add_triple('doc:personContent2', 'first_name', Q.literal('Kelley', 'xsd:string'))
        ,'Change PersonContent Revision 4 C1'
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
        .delete_triple('doc:cityContent1', 'name', 'v:City Name')
        .add_triple('doc:cityContent1', 'name', Q.literal('Fort worth', 'xsd:string'))
        ,'Add CityContent Revision 5 C2'
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
        .delete_triple('doc:personContent2', 'last_name', 'v:Last Name')
        .add_triple('doc:personContent2', 'last_name', Q.literal('Hughes', 'xsd:string'))
        ,'Change PersonContent Revision 5 C3'
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
            ,'Add Object Revision 6 A9'
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
        ,'Add Person Revision 6 A9'
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
        ,'Add PersonContent Revision 6 A9'
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
          ,'Add CityContent Revision 6 C4'
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
  var rebaseSource= {}
  let branchUrl = WOQL.resource('branch', branchName)
  console.log('# Merge branch_3_5 branchURL = ', branchUrl)
  rebaseSource.rebase_from = branchUrl
  rebaseSource.message = 'Merge branch_3_5 into Main'
  WOQL.rebase(rebaseSource).then(() => {
      console.log('# Merged branch_3_5 into Main')
  }).catch(error => console.log('Merged branch_3_5 into Main error', error))
}

//Add Revision 8 Data
const addRevision8 = () => {
  console.log('# Checking Object Schema')
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
    console.log('# Change PersonContent Revision 8 C5')
    WOQL.query(Q
        .delete_triple('doc:personContent2', 'pcity_id', 'City Id')
        .add_triple('doc:personContent2', 'pcity_id', Q.literal(1, 'xsd:integer'))
        ,'Change PersonContent Revision 8 C5'
    ).then(() => {
      console.log('# Changed PersonContent Revision 8 C5')
    }).catch(error => console.log('Change PersonContent Revision 8 C5 error', error))
  }).catch(error => console.log('PersonContent error', error))

  WOQL.query(Q
        .quad('v:Class', 'type', 'owl:Class', 'schema')
        .sub('system:Document', 'v:Class')
        .eq('v:Class', 'scm:Object')
    )
    .then(response => {
      console.log('# Delete Object Revision 8 D1')
      WOQL.query(Q
          .delete_object('doc:object3')
      ).then(() => {
          console.log('# Deleted Object Revision 8 D1')
      }).catch(error => console.log('Delete Object Revision 8 D1 error', error))
    }).catch(error => console.log('Object Schema error', error))

  WOQL.query(Q
        .quad('v:Class', 'type', 'owl:Class', 'schema')
        .sub('system:Document', 'v:Class')
        .eq('v:Class', 'scm:Person')
    )
    .then(response => {
      console.log('# Delete Person Revision 8 D1')
      WOQL.query(Q
          .delete_object('doc:person2')
          ,'Delete Person Revision 8 D1'
      ).then(() => {
        console.log('# Deleteed Person Revision 8 D1')
      }).catch(error => console.log('Delete Person Revision 8 D1 error', error))
    }).catch(error => console.log('Person Schema error', error))
    console.log('# Checking PersonContent Schema')
    
    WOQL.query(Q
        .quad('v:Class', 'type', 'owl:Class', 'schema')
        .sub('system:Document', 'v:Class')
        .eq('v:Class', 'scm:PersonContent')
    )
    .then(response => {
      console.log('# Delete PersonContent Revision 8 D1')
      WOQL.query(Q
          .delete_object('doc:personContent2')
          ,'Delete PersonContent Revision 8 D1'
      ).then(() => {
        console.log('# Deleteed PersonContent Revision 8 D1')
      }).catch(error => console.log('Delete PersonContent Revision 8 D1 error', error))
    }).catch(error => console.log('PersonContent error', error))
}

//Add Revision 9 Data
const addRevision9 = () => {
  console.log('# Set Database to CRT_Database')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')

  // Checkout the main branch
  console.log('# Merge branch_6_8 into Main')
  let branchName="branch_6_8"
  var rebaseSource= {}
  let branchUrl = WOQL.resource('branch', branchName)
  console.log('# Merge branch_6_8 branchURL = ', branchUrl)
  rebaseSource.rebase_from = branchUrl
  rebaseSource.message = 'Merge branch_6_8 into Main'
  WOQL.rebase(rebaseSource).then(() => {
      console.log('# Merged branch_6_8 into Main')
  }).catch(error => console.log('Merged branch_6_8 into Main error', error))
}

//Add Revision 6 Data
const addRevision10 = () => {
  console.log('# Checking Object Schema')
  // set database to use to CRT_Database
  WOQL.db('CRT_Database')
  
  WOQL.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:CityContent')
    )
    .then(response => {
      console.log('# Change CityContent Revision 10 C6')
      WOQL.query(Q
        .delete_triple('doc:cityContent2', 'name', 'Name')
            .add_triple('doc:cityContent2', 'name', Q.literal('Asstown', 'xsd:string'))
            ,'Change CityContent Revision 10 C6'
      ).then(() => {
          console.log('# Changed CityContent Revision 10 C6')
      }).catch(error => console.log('Change CityContent Revision 10 C6 error', error))
    }).catch(error => console.log('CityContent Schema error', error))
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
        ,'Add an Object data 0'
    ).then(() => {
      console.log('# add object2 data 1')
      WOQL.query(Q
          .add_triple('doc:object2', 'type', 'scm:Object')
          .add_triple('doc:object2', 'id', Q.literal(1, 'xsd:integer'))
          .add_triple('doc:object2', 'object_type', Q.literal('City', 'xsd:string'))
          ,'Add an Object data 1'
      ).then(() => {
        console.log('# add object3 data 2')
        WOQL.query(Q
            .add_triple('doc:object3', 'type', 'scm:Object')
            .add_triple('doc:object3', 'id', Q.literal(2, 'xsd:integer'))
            .add_triple('doc:object3', 'object_type', Q.literal('Person', 'xsd:string'))
            ,'Add an Object data 2'
        ).then(() => {
          console.log('# add object4 data 3')
          WOQL.query(Q
              .add_triple('doc:object4', 'type', 'scm:Object')
              .add_triple('doc:object4', 'id', Q.literal(3, 'xsd:integer'))
              .add_triple('doc:object4', 'object_type', Q.literal('City', 'xsd:string'))
              ,'Add an Object data 3'
          ).then(() => {
            console.log('# add object5 data 4')
            WOQL.query(Q
                .add_triple('doc:object5', 'type', 'scm:Object')
                .add_triple('doc:object5', 'id', Q.literal(4, 'xsd:integer'))
                .add_triple('doc:object5', 'object_type', Q.literal('Person', 'xsd:string'))
                ,'Add an Object data 4'
            ).then(() => {
              console.log('# add object6 data 5')
              WOQL.query(Q
                  .add_triple('doc:object6', 'type', 'scm:Object')
                  .add_triple('doc:object6', 'id', Q.literal(5, 'xsd:integer'))
                  .add_triple('doc:object6', 'object_type', Q.literal('City', 'xsd:string'))
                  ,'Add an Object data 5'
              ).then(() => {
                console.log('# add object7 data 6')
                WOQL.query(Q
                    .add_triple('doc:object7', 'type', 'scm:Object')
                    .add_triple('doc:object7', 'id', Q.literal(6, 'xsd:integer'))
                    .add_triple('doc:object7', 'object_type', Q.literal('Person', 'xsd:string'))
                    ,'Add an Object data 6'
                ).then(() => {
                  console.log('# add object8 data 7')
                  WOQL.query(Q
                      .add_triple('doc:object8', 'type', 'scm:Object')
                      .add_triple('doc:object8', 'id', Q.literal(7, 'xsd:integer'))
                      .add_triple('doc:object8', 'object_type', Q.literal('Person', 'xsd:string'))
                      ,'Add an Object data 7'
                  ).then(() => {
                    console.log('# add object9 data 8')
                    WOQL.query(Q
                        .add_triple('doc:object9', 'type', 'scm:Object')
                        .add_triple('doc:object9', 'id', Q.literal(8, 'xsd:integer'))
                        .add_triple('doc:object9', 'object_type', Q.literal('Person', 'xsd:string'))
                        ,'Add an Object data 8'
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

// Done
const done = () => {
  console.log('# Done')
}
