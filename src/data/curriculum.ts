import { GradeCurriculum } from '@/types';

// Complete curriculum data based on "Kết nối tri thức với cuộc sống" textbook
export const curriculum: GradeCurriculum[] = [
    {
        grade: 6,
        topics: [
            {
                id: 'grade6-topic1',
                name: 'Xây dựng ý tưởng trong sáng tác mỹ thuật',
                description: 'Tìm hiểu cách xây dựng ý tưởng và thể loại mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topic1-lesson1',
                        name: 'Tạo hình trong sáng tác mỹ thuật',
                        description: 'Học cách tạo hình và phát triển ý tưởng sáng tạo'
                    },
                    {
                        id: 'grade6-topic1-lesson2',
                        name: 'Các thể loại mỹ thuật',
                        description: 'Tìm hiểu về các thể loại mỹ thuật khác nhau'
                    }
                ]
            },
            {
                id: 'grade6-topic2',
                name: 'Ngôi nhà yêu thương',
                description: 'Khám phá vẻ đẹp của ngôi nhà qua nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topic2-lesson1',
                        name: 'Tạo hình ngôi nhà',
                        description: 'Vẽ và tạo hình ngôi nhà trong tác phẩm mỹ thuật'
                    },
                    {
                        id: 'grade6-topic2-lesson2',
                        name: 'Thiết kế quà lưu niệm',
                        description: 'Thiết kế quà lưu niệm với chủ đề ngôi nhà'
                    }
                ]
            },
            {
                id: 'grade6-topic3',
                name: 'Hoạt động trong trường học',
                description: 'Thể hiện các hoạt động học đường qua mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topic3-lesson1',
                        name: 'Tạo hình hoạt động học đường',
                        description: 'Vẽ các hoạt động trong trường học'
                    },
                    {
                        id: 'grade6-topic3-lesson2',
                        name: 'Thiết kế và tạo dáng đồ chơi',
                        description: 'Thiết kế đồ chơi sáng tạo'
                    }
                ]
            },
            {
                id: 'grade6-topic4',
                name: 'Mỹ thuật thời kỳ tiền sử',
                description: 'Khám phá mỹ thuật thế giới và Việt Nam thời tiền sử',
                lessonTypes: [
                    {
                        id: 'grade6-topic4-lesson1',
                        name: 'Mỹ thuật thế giới thời tiền sử',
                        description: 'Tìm hiểu nghệ thuật hang động và tạo hình nguyên thủy'
                    },
                    {
                        id: 'grade6-topic4-lesson2',
                        name: 'Mỹ thuật Việt Nam thời tiền sử',
                        description: 'Khám phá văn hóa Đông Sơn và nghệ thuật cổ Việt Nam'
                    }
                ]
            }
        ]
    },
    {
        grade: 7,
        topics: [
            {
                id: 'grade7-topic1',
                name: 'Mỹ thuật thế giới thời kỳ trung đại',
                description: 'Tìm hiểu nghệ thuật thế giới thời trung đại',
                lessonTypes: [
                    {
                        id: 'grade7-topic1-lesson1',
                        name: 'Mỹ thuật tạo hình thời trung đại',
                        description: 'Nghiên cứu hội họa và điêu khắc thời trung đại'
                    },
                    {
                        id: 'grade7-topic1-lesson2',
                        name: 'Mỹ thuật ứng dụng thời trung đại',
                        description: 'Khám phá kiến trúc và trang trí thời trung đại'
                    }
                ]
            },
            {
                id: 'grade7-topic2',
                name: 'Vẻ đẹp di tích',
                description: 'Khám phá và thể hiện vẻ đẹp di tích lịch sử',
                lessonTypes: [
                    {
                        id: 'grade7-topic2-lesson1',
                        name: 'Hình ảnh di tích trong sáng tạo',
                        description: 'Vẽ và tạo hình các di tích lịch sử'
                    },
                    {
                        id: 'grade7-topic2-lesson2',
                        name: 'Thiết kế tem bưu chính',
                        description: 'Thiết kế tem với hình ảnh di tích'
                    }
                ]
            },
            {
                id: 'grade7-topic3',
                name: 'Yếu tố dân tộc trong mỹ thuật',
                description: 'Tìm hiểu đặc trưng dân tộc trong nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade7-topic3-lesson1',
                        name: 'Tranh của các họa sĩ dân tộc',
                        description: 'Nghiên cứu tác phẩm của họa sĩ dân tộc Việt Nam'
                    },
                    {
                        id: 'grade7-topic3-lesson2',
                        name: 'Thiết kế logo dân tộc',
                        description: 'Tạo logo với yếu tố văn hóa dân tộc'
                    }
                ]
            },
            {
                id: 'grade7-topic4',
                name: 'Vẻ đẹp trong tác phẩm hội họa',
                description: 'Phân tích và cảm nhận vẻ đẹp trong tranh',
                lessonTypes: [
                    {
                        id: 'grade7-topic4-lesson1',
                        name: 'Không gian trong hội họa',
                        description: 'Tìm hiểu cách tạo không gian trong tranh'
                    },
                    {
                        id: 'grade7-topic4-lesson2',
                        name: 'Tranh tĩnh vật',
                        description: 'Vẽ và cảm nhận tranh tĩnh vật'
                    }
                ]
            },
            {
                id: 'grade7-topic5',
                name: 'Hiện thực cuộc sống trong sáng tạo mỹ thuật',
                description: 'Thể hiện cuộc sống thực qua nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade7-topic5-lesson1',
                        name: 'Nguồn sáng trong tranh',
                        description: 'Nghiên cứu ánh sáng và bóng tối trong hội họa'
                    },
                    {
                        id: 'grade7-topic5-lesson2',
                        name: 'Thiết kế trang phục',
                        description: 'Tạo mẫu trang phục từ cuộc sống'
                    }
                ]
            },
            {
                id: 'grade7-topic6',
                name: 'Sum họp gia đình',
                description: 'Thể hiện đề tài gia đình trong mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade7-topic6-lesson1',
                        name: 'Đề tài gia đình trong sáng tạo',
                        description: 'Vẽ tranh với chủ đề gia đình'
                    },
                    {
                        id: 'grade7-topic6-lesson2',
                        name: 'Thiết kế khung ảnh',
                        description: 'Làm khung ảnh từ vật liệu sẵn có'
                    }
                ]
            },
            {
                id: 'grade7-topic7',
                name: 'Mỹ thuật Việt Nam thời kỳ trung đại',
                description: 'Khám phá di sản mỹ thuật Việt Nam thời trung đại',
                lessonTypes: [
                    {
                        id: 'grade7-topic7-lesson1',
                        name: 'Di sản mỹ thuật trung đại',
                        description: 'Tìm hiểu kiến trúc và điêu khắc Việt Nam thời trung đại'
                    },
                    {
                        id: 'grade7-topic7-lesson2',
                        name: 'Khai thác giá trị mỹ thuật',
                        description: 'Ứng dụng giá trị mỹ thuật truyền thống'
                    }
                ]
            }
        ]
    },
    {
        grade: 8,
        topics: [
            {
                id: 'grade8-topic1',
                name: 'Hình tượng con người trong mỹ thuật',
                description: 'Tìm hiểu cách thể hiện con người trong nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topic1-lesson1',
                        name: 'Tạo hình con người',
                        description: 'Vẽ chân dung và hình thể con người'
                    },
                    {
                        id: 'grade8-topic1-lesson2',
                        name: 'Bố cục trong tranh sinh hoạt',
                        description: 'Học các dạng bố cục khi vẽ người'
                    }
                ]
            },
            {
                id: 'grade8-topic2',
                name: 'Vẻ đẹp trong nghệ thuật truyền thống',
                description: 'Khám phá giá trị nghệ thuật truyền thống',
                lessonTypes: [
                    {
                        id: 'grade8-topic2-lesson1',
                        name: 'Nghệ thuật truyền thống Việt Nam',
                        description: 'Tìm hiểu tranh dân gian, đồ gốm truyền thống'
                    },
                    {
                        id: 'grade8-topic2-lesson2',
                        name: 'Thiết kế trang phục dân tộc',
                        description: 'Tạo trang phục với hoa văn dân tộc thiểu số'
                    }
                ]
            },
            {
                id: 'grade8-topic3',
                name: 'Niềm vui, hạnh phúc',
                description: 'Thể hiện cảm xúc tích cực qua mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topic3-lesson1',
                        name: 'Niềm vui trong tác phẩm hội họa',
                        description: 'Vẽ tranh thể hiện niềm vui và hạnh phúc'
                    },
                    {
                        id: 'grade8-topic3-lesson2',
                        name: 'Thiết kế quà sinh nhật',
                        description: 'Tạo quà tặng sinh nhật sáng tạo'
                    }
                ]
            },
            {
                id: 'grade8-topic4',
                name: 'Mỹ thuật thế giới thời kỳ hiện đại',
                description: 'Tìm hiểu các trường phái mỹ thuật hiện đại',
                lessonTypes: [
                    {
                        id: 'grade8-topic4-lesson1',
                        name: 'Trường phái mỹ thuật phương Tây',
                        description: 'Nghiên cứu ấn tượng, lập thể, siêu thực'
                    },
                    {
                        id: 'grade8-topic4-lesson2',
                        name: 'Nghệ thuật trang trí đồ gia dụng',
                        description: 'Trang trí đồ vật theo phong cách hiện đại'
                    }
                ]
            },
            {
                id: 'grade8-topic5',
                name: 'Vẻ đẹp trong lao động',
                description: 'Tôn vinh vẻ đẹp của người lao động',
                lessonTypes: [
                    {
                        id: 'grade8-topic5-lesson1',
                        name: 'Người lao động trong sáng tạo',
                        description: 'Vẽ tranh về người lao động'
                    },
                    {
                        id: 'grade8-topic5-lesson2',
                        name: 'Nghệ thuật trổ giấy',
                        description: 'Tạo tác phẩm trổ giấy với chủ đề lao động'
                    }
                ]
            },
            {
                id: 'grade8-topic6',
                name: 'Giao thông công cộng',
                description: 'Thể hiện giao thông đô thị qua mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topic6-lesson1',
                        name: 'Giao thông trong sáng tạo mỹ thuật',
                        description: 'Vẽ tranh về phương tiện giao thông'
                    },
                    {
                        id: 'grade8-topic6-lesson2',
                        name: 'Thiết kế poster an toàn giao thông',
                        description: 'Tạo poster tuyên truyền giao thông'
                    }
                ]
            }
        ]
    },
    {
        grade: 9,
        topics: [
            {
                id: 'grade9-topic1',
                name: 'Cuộc sống muôn màu',
                description: 'Thể hiện sự đa dạng của cuộc sống',
                lessonTypes: [
                    {
                        id: 'grade9-topic1-lesson1',
                        name: 'Vẻ đẹp cuộc sống trong tác phẩm',
                        description: 'Vẽ tranh về cuộc sống hàng ngày'
                    },
                    {
                        id: 'grade9-topic1-lesson2',
                        name: 'Thiết kế phụ kiện thời trang',
                        description: 'Tạo phụ kiện thời trang sáng tạo'
                    }
                ]
            },
            {
                id: 'grade9-topic2',
                name: 'Nghệ thuật đương đại thế giới',
                description: 'Tìm hiểu xu hướng nghệ thuật đương đại',
                lessonTypes: [
                    {
                        id: 'grade9-topic2-lesson1',
                        name: 'Trào lưu nghệ thuật đương đại',
                        description: 'Nghiên cứu các trào lưu nghệ thuật mới'
                    },
                    {
                        id: 'grade9-topic2-lesson2',
                        name: 'Thiết kế đương đại',
                        description: 'Đặc điểm thiết kế trong thời kỳ đương đại'
                    }
                ]
            },
            {
                id: 'grade9-topic3',
                name: 'Thiết kế mỹ thuật sách',
                description: 'Học thiết kế sách và minh họa',
                lessonTypes: [
                    {
                        id: 'grade9-topic3-lesson1',
                        name: 'Thiết kế bìa sách',
                        description: 'Tạo bìa sách hấp dẫn và chuyên nghiệp'
                    },
                    {
                        id: 'grade9-topic3-lesson2',
                        name: 'Tranh minh họa',
                        description: 'Vẽ tranh minh họa cho sách'
                    }
                ]
            },
            {
                id: 'grade9-topic4',
                name: 'Cảm hứng trong sáng tác mỹ thuật',
                description: 'Khám phá nguồn cảm hứng sáng tạo',
                lessonTypes: [
                    {
                        id: 'grade9-topic4-lesson1',
                        name: 'Cảm hứng trong hội họa',
                        description: 'Tìm và phát triển cảm hứng vẽ tranh'
                    },
                    {
                        id: 'grade9-topic4-lesson2',
                        name: 'Thiết kế nhận diện thương hiệu',
                        description: 'Tạo hình ảnh nhận diện thương hiệu'
                    }
                ]
            },
            {
                id: 'grade9-topic5',
                name: 'Vẻ đẹp của nguyên mẫu',
                description: 'Nghiên cứu nguyên mẫu trong nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade9-topic5-lesson1',
                        name: 'Tỷ lệ và hình khối',
                        description: 'Học về tỷ lệ và hình khối của đồ vật'
                    },
                    {
                        id: 'grade9-topic5-lesson2',
                        name: 'Nguyên mẫu trong điêu khắc',
                        description: 'Tìm hiểu nguyên mẫu trong tác phẩm điêu khắc'
                    }
                ]
            },
            {
                id: 'grade9-topic6',
                name: 'Nghệ thuật múa rối',
                description: 'Khám phá nghệ thuật múa rối truyền thống',
                lessonTypes: [
                    {
                        id: 'grade9-topic6-lesson1',
                        name: 'Vẻ đẹp tạo hình con rối',
                        description: 'Nghiên cứu tạo hình con rối'
                    },
                    {
                        id: 'grade9-topic6-lesson2',
                        name: 'Tạo hình nhân vật múa rối nước',
                        description: 'Thiết kế nhân vật múa rối nước'
                    }
                ]
            },
            {
                id: 'grade9-topic7',
                name: 'Nghệ thuật đương đại Việt Nam',
                description: 'Tìm hiểu nghệ thuật đương đại Việt Nam',
                lessonTypes: [
                    {
                        id: 'grade9-topic7-lesson1',
                        name: 'Phong cách sáng tác đương đại',
                        description: 'Nghiên cứu phong cách nghệ sĩ Việt Nam đương đại'
                    },
                    {
                        id: 'grade9-topic7-lesson2',
                        name: 'Thiết kế sản phẩm tái sử dụng',
                        description: 'Tạo đồ gia dụng từ vật liệu tái chế'
                    }
                ]
            },
            {
                id: 'grade9-topic8',
                name: 'Hướng nghiệp',
                description: 'Giới thiệu nghề nghiệp liên quan đến mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade9-topic8-lesson1',
                        name: 'Ngành nghề mỹ thuật ứng dụng',
                        description: 'Tìm hiểu các ngành nghề thiết kế, mỹ thuật'
                    },
                    {
                        id: 'grade9-topic8-lesson2',
                        name: 'Đặc trưng nghề mỹ thuật',
                        description: 'Khám phá yêu cầu và kỹ năng nghề mỹ thuật'
                    }
                ]
            }
        ]
    }
];

// Helper function to get curriculum by grade
export const getCurriculumByGrade = (grade: 6 | 7 | 8 | 9): GradeCurriculum | undefined => {
    return curriculum.find(c => c.grade === grade);
};

// Helper function to get topic by ID
export const getTopicById = (topicId: string): Topic | undefined => {
    for (const gradeCurriculum of curriculum) {
        const topic = gradeCurriculum.topics.find(t => t.id === topicId);
        if (topic) return topic;
    }
    return undefined;
};

// Helper function to get lesson type by ID
export const getLessonTypeById = (lessonTypeId: string): LessonType | undefined => {
    for (const gradeCurriculum of curriculum) {
        for (const topic of gradeCurriculum.topics) {
            const lessonType = topic.lessonTypes.find(lt => lt.id === lessonTypeId);
            if (lessonType) return lessonType;
        }
    }
    return undefined;
};
