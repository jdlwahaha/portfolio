/**
 * require books.service.js getRatingString(); 
 */

(function() { 
    $(document).ready(function() { 
        $.getJSON('../../data/courses/courses.json', loadCourses);       
    });

    function loadCourses(courses) {

        // remove empty records
        courses = courses.filter((r) => { return  r.courseName != '' });
        let content = '';
    
    
        courses.map(function (course) {
            content += getCourseHTML(course); 
        });
    
        $('#course_list').append(content);
    
    }
    
    function getCourseHTML(course) { 
        const thumbnail = `../../data/courses/thumbnails/${course.thumbnail}.png`;
    
        return `
            <section class="box">
                <div class="box-content">
                    <span class="thumbnail-container course-thumbnail-container">
                        <img src="${thumbnail}" alt="${course.thumbnail}.png">
                    </span>
                    <div class="book-container course-container">
                        <h4>${course.courseName}</h4>
                        <div class="author">Instructor: ${course.instructor}</div>
                        <div class="rating"> ${getRatingString(course.rating)}</div>
                        <p>Status: 
                            ${course.completed ? '<span class="completed">Completed</span>': '<span class"in-progress">In Progress</span>'}
                        </p>
                    </div>
                </div>
            </section>
        `;
    }


})(); 





