WOQL.and(         
    WOQL.doctype('scm:Object')
        .label('Object')
        .description('An Object is either a City, Person or Null')
        .property('id', 'xsd:integer').cardinality(1)
        .property('completed', 'xsd:boolean').cardinality(1),
    WOQL.doctype("scm:City").label("City")
        .description('An Object of type City')
        .property("id", "xsd:integer").label("City Id").cardinality(1)
        .property("object_id", "xsd:integer").label("Object Id").cardinality(1),
    WOQL.doctype("scm:Person").label("Person")
        .description('An Object of type Person')
        .property("person_object", "Person").label("Person Object")
        .property("id", "xsd:integer").label("Person Id").cardinality(1)
        .property("object_id", "xsd:integer").label("Object Id").cardinality(1),
    WOQL.doctype("scm:CityContent").label("City Content")
        .description('An Object of type City Content')
        .property("id", "xsd:integer").label("City Content Id").cardinality(1)
        .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
        .property("city_id", "xsd:integer").label("City Id").cardinality(1)
        .property("name", "xsd:string").label("City Name"),
    WOQL.doctype("scm:PersonContent").label("Person Content")
        .description('An Object of type Person Content')
        .property("id", "xsd:integer").label("Person Content Id").cardinality(1)
        .property("content_id", "xsd:integer").label("Content Id").cardinality(1)
        .property("person_id", "xsd:integer").label("Person Id").cardinality(1)
        .property("first_name", "xsd:string").label("First Name")
        .property("last_name", "xsd:string").label("Last Name")
        .property("age", "xsd:integer").label("Person Age").cardinality(1)
        .property("city_id", "xsd:integer").label("City Id").cardinality(1)
)
