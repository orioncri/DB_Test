WOQL.and(         
    WOQL.doctype("Object").label("City or Person")             
        .description("An object is either a City, Person or Null")
        .property("id", "xsd:integer").label("Object Id").cardinality(1)
// RER        .property("objet_type", "string").label("Object Type")
        .property('completed', 'xsd:boolean').label("Completed").cardinality(1),
    WOQL.doctype("City").label("City")
        .description('An Object of type City')
        .property("city_object", "Object").label("City Object")
        .property("id", "xsd:integer").label("City Id").cardinality(1)
        .property("object_id", "xsd:integer").label("Object Id").cardinality(1),
    WOQL.doctype("Person").label("Person")
        .description('An Object of type Person')
        .property("person_object", "Object").label("Person Object")
        .property("id", "xsd:integer").label("Person Id").cardinality(1)
        .property("object_id", "xsd:integer").label("Object Id").cardinality(1),
    WOQL.doctype("City_Content").label("City_Content")             
        .description('An Object of type City Content')
        .property("id", "xsd:integer").label("City Content Id").cardinality(1)
        .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
        .property("city_id", "xsd:integer").label("City Id").cardinality(1)
        .property("name", "string").label("City Name"),
    WOQL.doctype("Person_Content").label("Person Content")             
        .description('An Object of type Person Content')
        .property("id", "xsd:integer").label("Person Content Id").cardinality(1)
        .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
        .property("person_id", "xsd:integer").label("Person Id").cardinality(1)
        .property("first_name", "string").label("First Name")
        .property("last_name", "string").label("Last Name")
        .property("age", "xsd:integer").label("Person Age").cardinality(1)
        .property("city_id", "xsd:integer").label("City Id").cardinality(1)
)
