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

WOQL.select("v:Id", "v:Object_type").and(
        WOQL.triple("v:Object", "id", "scm:Object"),
        WOQL.triple("v:Object", "object_type", "scm:Object")
)

_________________________________________________________________

// Works
WOQL.select("v:Id").and(
        WOQL.triple("v:Object", "id", "v:Id")
)

// Works
// WOQL.select("v:Completed", "v:Id").and(
WOQL.select("v:Id", "v:Object Type").and(
	WOQL.triple("v:Object", "type", "scm:Object"),
        WOQL.triple("v:Object", "object_type", "v:Object Type"),
        WOQL.triple("v:Object", "id", "v:Id")
)

WOQL.select("v:Cid", "v:City Object Id").and(
        WOQL.triple("v:City", "type", "scm:City"),
        WOQL.triple("v:City", "c_object_id", "v:City Object Id"),
        WOQL.triple("v:City", "cid", "v:Cid")
)

WOQL.select("v:Pid", "v:Person Object Id").and(
        WOQL.triple("v:Person", "type", "scm:Person"),
        WOQL.triple("v:Person", "p_object_id", "v:Person Object Id"),
        WOQL.triple("v:Person", "pid", "v:Pid")
)

WOQL.select("v:Ccid", "v:City Content Id", "v:City Id", "v:City Name").and(
        WOQL.triple("v:CityContent", "type", "scm:CityContent"),
        WOQL.triple("v:CityContent", "cityContent_id", "v:City Content Id"),
        WOQL.triple("v:CityContent", "ccid", "v:Ccid"),
        WOQL.triple("v:CityContent", "ccity_id", "v:City Id"),
        WOQL.triple("v:CityContent", "name", "v:City Name")
)

WOQL.select("v:Pcid", "v:Person Content Id", "v:Person Id", "v:City Name", "v:Person Id",
            "v:First Name", "v:Last Name", "v:Person Age", "v:City Id").and(
        WOQL.triple("v:PersonContent", "type", "scm:PersonContent"),
        WOQL.triple("v:PersonContent", "personContent_id", "v:Person Content Id"),
        WOQL.triple("v:PersonContent", "pcid", "v:Pcid"),
        WOQL.triple("v:PersonContent", "person_id", "v:Person Id"),
        WOQL.triple("v:PersonContent", "first_name", "v:First Name"),
        WOQL.triple("v:PersonContent", "last_name", "v:Last Name"),
        WOQL.triple("v:PersonContent", "age", "v:Person Age"),
        WOQL.triple("v:PersonContent", "pcity_id", "v:City Id")
)

