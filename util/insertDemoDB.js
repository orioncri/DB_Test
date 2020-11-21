  WOQL.query(Q
    .add_triple('doc:Object', 'type', 'scm:Object')
    .add_triple('doc:Object', 'id', Q.literal(0, 'integer'))
    .add_triple('doc:Object', 'object_type', Q.literal(-1, 'string'))
    .add_triple('doc:Object', 'completed', Q.literal(true, 'boolean'))
    .comment('Add an example data 0')
  )


  WOQL.query(Q
    WOQL.add_triple('doc:Object', 'type', 'scm:Object')
    WOQL.add_triple('doc:Object', 'id', 0)
    WOQL.add_triple('doc:Object', 'object_type', null)
    WOQL.add_triple('doc:Object', 'completed', true)
    .comment('Add an example data 0')
  )

