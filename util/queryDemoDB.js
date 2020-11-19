WOQL.select("v:Start", "v:Start_Label", "v:End", "v:End_Label").and(
	WOQL.triple("v:Journey", "type", "scm:Journey"),
	WOQL.triple("v:Journey", "start_station", "v:Start"),
	WOQL.opt().triple("v:Start", "label", "v:Start_Label"),
	WOQL.triple("v:Journey", "end_station", "v:End"),
	WOQL.opt().triple("v:End", "label", "v:End_Label"),
	WOQL.triple("v:Journey", "journey_bicycle", "v:Bike")
)

WOQL.select("v:Start", "v:Start_Label").and(
        WOQL.triple("v:Journey", "start_station", "v:Start")
)

WOQL.select("v:Id").and(
        WOQL.triple("v:Object", "id", "v:Id")
)

WOQL.select("v:Id", "v:Object_type").and(
        WOQL.triple("v:Object", "id", "scm:Object"),
        WOQL.triple("v:Object", "object_type", "scm:Object")
)

