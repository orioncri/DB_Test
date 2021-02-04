import os
import shutil
import logging
import datetime
from doltpy.core import Dolt
from doltpy.core.system_helpers import get_logger

LOG_LEVEL = logging.FATAL
logger = logging.getLogger()
logger.setLevel(LOG_LEVEL)


def main():
    #cleanup()

    repo_path = "."
    repo = Dolt(repo_path)

    act_branch, branches = repo.branch()
    brn_cnt=len(branches)

    print()

    answer = ''
    printFlag = False

    while answer != 'q':
        print("0 - List Branches")
        print("1 - List Active Branch")
        print("2 - Get Branch Commits/Revisions")
        print("3 - Change Branch")
        print("4 - Create Branch")
        print("5 - Merge Branch")
        print("6 - Delete Branch")
        print("7 - List Revision Range")
        print("8 - Checkout a Revision")
        print("9 - Enable List Commits Printing")
        print("10- Add Revisions")
        print("11- Batch Revisions")
        print("q - Quit")
        answer = input("Select item : ")

        #try:
        # List Branches
        if answer == '0':
            act_branch, branches = repo.branch()
            brn_cnt=len(branches)
            for brn_id in range(0,brn_cnt):
                branchData = str(branches[brn_id]).split(":", 2)
                branchName = str(branchData[1]).split(",", 1)
                print (branchName[0])

        # List Active Branch
        elif answer == '1':
            print()
            print("Active Branch:")
            print(act_branch)
            print()

        # Get Branch Commits/Revisions
        elif answer == '2':
            start_time = datetime.datetime.now()
            commits = list(repo.log().values())
            end_time = datetime.datetime.now()
            com_cnt=len(commits)
            print("Total Revisions = ", com_cnt)
            print("Total Commit Revision Pull Time = ", end_time-start_time)
            for com_id in range(0,com_cnt):
                com_data = str(commits[com_id]).split(":", 1)
                msg = com_data[1].split(" @ ", 1)
                if printFlag == True:
                    print("commit_id: ", com_id, msg[1])

        # Change Branch
        elif answer == '3':
            myBranch = input("Branch Name : ")
            switch_branch(repo, myBranch)
            act_branch, branches = repo.branch()
            brn_cnt=len(branches)
            start_time = datetime.datetime.now()
            commits = list(repo.log().values())
            end_time = datetime.datetime.now()
            com_cnt=len(commits)
            print("Total Commit Revision Pull Time = ", end_time-start_time)

        # Create Branch
        elif answer == '4':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            newBranch = input("Enter New Branch Name : ")
            start_time = datetime.datetime.now()
            create_branch(repo, newBranch)
            end_time = datetime.datetime.now()
            print("Total Create Branch Time = ", end_time-start_time)

        # Merge Branch
        elif answer == '5':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            mergeBranch = input("Enter Merge Branch Name : ")
            start_time = datetime.datetime.now()
            merge_branch(repo, mergeBranch, "Merging Branch")
            end_time = datetime.datetime.now()
            print("Total Merge Branch Time = ", end_time-start_time)

        # Delete Branch
        elif answer == '6':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            deleteBranch = input("Enter Branch Name To Delete : ")
            start_time = datetime.datetime.now()
            delete_branch(repo, deleteBranch)
            end_time = datetime.datetime.now()
            print("Total Create Branch Time = ", end_time-start_time)

        # List Revision Range
        elif answer == '7':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            revision_id = int(input("Enter Start Revision ID : "))
            revision_max = int(input("Enter Revision Range : "))
            for com_id in range(revision_id,revision_id+revision_max):
                com_data = str(commits[com_id]).split(":", 1)
                msg = com_data[1].split(" @ ", 1)
                print("commit_id: ", com_id, msg[1])

        # Checkout a Revision
        elif answer == '8':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            revision_id = int(input("Enter Revision ID : "))
            com_data = str(commits[revision_id]).split(":", 1)
            msg = com_data[1].split(" @ ", 1)
            startBranch = "revision"+str(revision_id)
            start_time = datetime.datetime.now()
            starting_point_branch(repo, startBranch, com_data[0])
            end_time = datetime.datetime.now()
            print("Total Merge Branch Time = ", end_time-start_time)

        # Enable List Commits Printing
        elif answer == '9':
            printFlag = True

        # Add Revisions
        elif answer == '10':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            person = str(input("Enter First Name : "))
            revision_id = int(input("Enter Start Revision ID : "))
            revision_max = int(input("Enter End Revision ID : "))
            start_time = datetime.datetime.now()
            for revId in range(revision_id,revision_max+1):
                change_person_revid(repo, person, revId)
                comment=f"{person}      RevID="+str(revId).zfill(2)
                commit(repo, comment)

            end_time = datetime.datetime.now()
            print("Total Revision Addition Time = ", end_time-start_time)
            print(f"Revisions {revision_id} -> {revision_max}")

        # Batch Revisions
        elif answer == '11':
            print()
            print("Active Branch:")
            print(act_branch)
            print()
            person = str(input("Enter First Name : "))
            revision_id = int(input("Enter Start Revision ID : "))
            revision_max = int(input("Enter Revision Range : "))
            step = 50
            start_time = datetime.datetime.now()
            batch_revisions(repo, revision_id, revision_max, step, person)

            end_time = datetime.datetime.now()
            print("Total Revision Addition Time = ", end_time-start_time)


        #except DoltException as derr:
        #    print("Merge ExceDoltExceptionption", derr)
        #    pass

        #except:
        #    pass

def batch_revisions(repo, start, stop, step, name):
    print(f"Revisions {start} - {stop} for {name}")
    while start <= stop:
        print(f"    Batch {start:>3} - {start+step-1:>3}")
        _create_revisions_via_batches(repo, start, start+step, name)
        start = start + step


def _create_revisions_via_batches(repo, start, stop, name):
    batch_query = ""
    for revId in range(start,stop):
        batch_query += change_person_revid_query_string(repo, name, revId)
        message = f"{name}    RevID={revId:0>2}"
        batch_query += commit_via_sql_string(repo, message)

    repo.sql(query=batch_query, result_format="tabular", batch=True)


def commit_via_sql_string(repo, message):
    query = f"SELECT DOLT_COMMIT('-a', '-m', '{message}', '--allow-empty') ; "
    return query


def create_view(repo):
    repo.sql(query='''
        CREATE VIEW PersonView AS 
            select first_name,last_name,age,city.name from person JOIN city on person.city_id=city.id;
    ''', result_format="tabular")


def show_view_status(repo):
    #print("Person View")
    repo.sql(query="SELECT * FROM PersonView", result_format="tabular")


def merge_branch(repo, branch_name, message):
    #switch_branch(repo, "master")
    repo.merge(branch_name, message)


def switch_branch(repo, branch_name):
    repo.checkout(branch_name)


def delete_branch(repo, branch_name):
    repo.branch(branch_name, None, None, True, True, False, False)


def starting_point_branch(repo, branch_name, start_point):
    repo.checkout(start_point, None, True, branch_name)


def remove_person(repo, table, condition):
    query = f"DELETE FROM {table} where {condition}"
    repo.sql(query=query, result_format="tabular")


def change_city(repo, column, before, after):
    query = f"UPDATE city SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")


def change_person(repo, column, before, after):
    query = f"UPDATE person SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")


def change_person_revid(repo, person, revision):
    query = f"UPDATE person SET rev_id = {revision} WHERE first_name ='{person}'"
    repo.sql(query=query, result_format="tabular")


def change_person_revid_query_string(repo, person, revision):
    query = f"UPDATE person SET rev_id = {revision} WHERE id='{person}'; "
    return query

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
    #add_tables(repo)
    repo.add(['person'])
    repo.commit(message)
    #show_view_status(repo)


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
