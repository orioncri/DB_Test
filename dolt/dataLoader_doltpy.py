import os
import shutil
import logging
from doltpy.core import Dolt
from doltpy.core.system_helpers import get_logger


def main():
    #cleanup()

    repo_path = "."
    repo = Dolt.init(repo_path)
    #create_tables(repo)
    #create_view(repo)
    #commit(repo, "R0 - creating tables, views")

    add_city(repo, "fort worth")
    add_person(repo, "Duane", "Knesek", 25, "fort worth")
    commit(repo, "R1 - A1 A2")

    create_branch(repo, "branch_3_5")

    add_city(repo, "Dallas")
    add_person(repo, "kelley", "hughes", 21, "Dallas")
    commit(repo, "R2 - A3 A4")

    create_branch(repo, "branch_6_8")

    switch_branch(repo, "branch_3_5")
    add_city(repo, "Arlington")
    add_person(repo, "michaela", "kidd", 22, "Arlington")
    commit(repo, "R3 - A5 A6")

    switch_branch(repo, "master")
    add_person(repo, "Luis", "Marrufo", 22, "fort worth")
    change_person(repo, "first_name", "kelley", "Kelley")
    commit(repo, "R4 - A7 C4")

    switch_branch(repo, "branch_3_5")
    change_city(repo, "name", "fort worth", "Fort worth")
    change_person(repo, "last_name", "hughes", "Hughes")
    commit(repo, "R5 - C1 C4")

    merge_branch(repo, 'branch_3_5', "R7 - merging branch_3_5 to master")

    switch_branch(repo, "branch_6_8")
    add_person(repo, "JD", "Bone", 22, "fort worth")
    change_city(repo, "name", "fort worth", "Fort Worth")
    commit(repo, "R6 - A8 C1")

    switch_branch(repo, "master")
    change_person(repo, "city_id", 2, 1)
    commit(repo, "R7 - C4")

    switch_branch(repo, "branch_6_8")
    remove_person(repo, "person", "first_name='Duane'")
    commit(repo, "R8 - C4 D2")

    merge_branch(repo, 'branch_6_8', "R9 - merging branch_6_8 to master")

    change_city(repo, "name", "Dallas", "Sadtown")
    commit(repo, "R10 - C3")


def create_view(repo):
    repo.sql(query='''
        CREATE VIEW PersonView AS 
            select first_name,last_name,age,city.name from person JOIN city on person.city_id=city.id;
    ''', result_format="tabular")


def show_view_status(repo):
    print("Person View")
    repo.sql(query="SELECT * FROM PersonView", result_format="tabular")


def merge_branch(repo, branch_name, message):
    switch_branch(repo, "master")
    repo.merge(branch_name, message)


def switch_branch(repo, branch_name):
    repo.checkout(branch_name)


def remove_person(repo, table, condition):
    query = f"DELETE FROM {table} where {condition}"
    repo.sql(query=query, result_format="tabular")


def change_city(repo, column, before, after):
    query = f"UPDATE city SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")


def change_person(repo, column, before, after):
    query = f"UPDATE person SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")


def get_city_id_from_name(repo, city_name):
    query = f"SELECT id FROM city where name='{city_name}'"
    results = repo.sql(query, "json")
    city_id = results['rows'][0]['id']
    return city_id


def add_person(repo, first_name, last_name, age, city_name):
    city_id = get_city_id_from_name(repo, city_name)
    _add_person_with_id(repo, first_name, last_name, age, city_id)


def _add_person_with_id(repo, first_name, last_name, age, city_id):
    try:
        add_person.counter += 1
    except AttributeError:
        add_person.counter = 1
    query = f"INSERT INTO person VALUES ({add_person.counter}, '{first_name}', '{last_name}', '{age}', {city_id})"
    repo.sql(query=query, result_format="tabular")


def add_city(repo, city_name):
    try:
        add_city.counter += 1
    except AttributeError:
        add_city.counter = 1
    query = f"INSERT INTO city VALUES ({add_city.counter}, '{city_name}')"
    repo.sql(query=query, result_format="tabular")


def create_branch(repo, branch_name):
    repo.branch(branch_name)


def add_tables(repo):
    repo.add(['person', 'city', 'dolt_schemas'])


def commit(repo, message):
    add_tables(repo)
    repo.commit(message)
    show_view_status(repo)


def create_tables(repo):
    repo.sql(query='''
        CREATE TABLE city (
            id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(30) NULL
        );
    ''', result_format="tabular")

    repo.sql(query='''
        CREATE TABLE person (
            id int NOT NULL AUTO_INCREMENT,
            first_name varchar(50) NULL,
            last_name varchar(50) NULL,
            age int NULL,
            city_id int NULL,
            PRIMARY KEY (id)
        );
    ''', result_format="tabular")


def cleanup():
    try:
        shutil.rmtree('.dolt')
    except:
        pass


if __name__ == "__main__":
    main()
